/* abstract away the playing of wav buffer in case browser issues come up, etc
can change the code here and other code won't be affected.
*/

import { CreatedWav } from '../../wav/CreatedWav'
import { MorseStringToWavBuffer } from '../../wav/morseStringToWavBuffer'
import { ISoundMaker } from '../ISoundMaker'
import { SoundMakerConfig } from '../SoundMakerConfig'
import { SmoothedSoundsContext } from './SmoothedSoundsContext'
import  audioBufferToWav from 'audiobuffer-to-wav'

export default class SmoothedSoundsPlayer implements ISoundMaker {
  sourceEnded:boolean = true
  sourceEndedCallBack:any
  noisePlaying:boolean = false
  lastNoiseType = 'off'
  scaledVolume?:number
  wavInfo?:CreatedWav
  config?:SoundMakerConfig
  nodesConnected:boolean = false
  ssContext!:SmoothedSoundsContext

  startNoise = (config:SoundMakerConfig) => {
    let noiseNodeMaker:any = null
    const afterImport = (def:any) => {
      def.install()
      noiseNodeMaker()
      this.ssContext.noiseGainNode = this.ssContext.audioContext.createGain()
      this.setNoiseVolume(config.noise.scaledNoiseVolume)
      this.ssContext.noiseNode.connect(this.ssContext.noiseGainNode)
      this.ssContext.noiseGainNode.connect(this.ssContext.audioContext.destination)
      this.ssContext.noiseNode.start()
      console.log('started a noise node')
      this.noisePlaying = true
    }
    switch (config.noise.type) {
      case 'white':
        noiseNodeMaker = () => { this.ssContext.noiseNode = (this.ssContext.audioContext as any).createWhiteNoise() }
        import('white-noise-node').then(({ default: def }) => {
          afterImport(def)
        })
        break
      case 'brown':
        noiseNodeMaker = () => { this.ssContext.noiseNode = (this.ssContext.audioContext as any).createBrownNoise() }
        import('brown-noise-node').then(({ default: def }) => {
          afterImport(def)
        })
        break
      case 'pink':
        noiseNodeMaker = () => { this.ssContext.noiseNode = (this.ssContext.audioContext as any).createPinkNoise() }
        import('pink-noise-node').then(({ default: def }) => {
          afterImport(def)
        })
    }
  }

  setVolume = (scaledVolume:number) => {
    this.scaledVolume = scaledVolume
    // if (this.myAudioContext) {
    //   this.gainNode.gain.setValueAtTime(scaledVolume, this.myAudioContext.currentTime)
    // }
  }

  setNoiseVolume = (scaledVolume:number) => {
    if (this.ssContext.audioContext) {
      this.ssContext.noiseGainNode.gain.setValueAtTime(scaledVolume, this.ssContext.audioContext.currentTime)
    }
  }

  stopNoise = () => {
    if (this.ssContext.noiseNode && this.noisePlaying) {
      this.ssContext.noiseNode.stop()
      this.noisePlaying = false
    }
  }

  handleNoiseSettings = (config:SoundMakerConfig) => {
    if (this.ssContext) {
      const noiseWasPlaying = this.noisePlaying
      const typeChanged = config.noise.type !== this.lastNoiseType
      const typeIsOff = config.noise.type === 'off'
      if ((typeChanged && this.noisePlaying) || typeIsOff) {
        this.stopNoise()
      }
      if (!typeIsOff && config.playerPlaying) {
        if ((noiseWasPlaying && typeChanged) || (!noiseWasPlaying)) {
          this.startNoise(config)
        }
      }
      this.lastNoiseType = config.noise.type
    }
  }

  setGainTimings = (wavInfo:CreatedWav, scaledVolume:number, config:SoundMakerConfig) => {
    const currentTimeSecs = this.ssContext.audioContext.currentTime
    const currentTimeMs = currentTimeSecs * 1000
    // console.log(`currentTimeMs:${currentTimeMs}`)
    wavInfo.timeLine.forEach((soundEvent) => {
      const eventType = soundEvent.event
      const time = soundEvent.time + currentTimeMs
      // const eventDuration = time - lastTime
      const riseTimeTarget = (time / 1000) // - (config.riseMsOffset / 1000)
      switch (eventType) {
        case 'prepad_start':
          this.ssContext.gainNode.gain.setValueAtTime(0, time)
          break
        case 'dah_start':
        case 'dit_start':
          // https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime
          this.ssContext.oscillatorNode.frequency.setValueAtTime(eventType === 'dit_start' ? config.ditFrequency : config.dahFrequency, riseTimeTarget)
          this.ssContext.bandpassNode.frequency.setValueAtTime(eventType === 'dit_start' ? config.ditFrequency : config.dahFrequency, riseTimeTarget)
          this.ssContext.gainNode.gain.setTargetAtTime(scaledVolume, riseTimeTarget, config.riseTimeConstant)
          break
        case 'dah_end':
        case 'dit_end':
          this.ssContext.gainNode.gain.setTargetAtTime(0, (time / 1000) - (config.decayMsOffset / 1000), config.decayTimeConstant)
          break
        default:
          // gainNode.gain.setTargetAtTime(0, time / 1000, decayTimeConstant)
          break
      }
      // lastTime = time
    })
  }

  play = (config:SoundMakerConfig, onEnded:any) => {
    const wavInfo = MorseStringToWavBuffer.createWav(config, false)
    config.noise.scaledNoiseVolume = config.noise.volume / 10
    this.doPlay(wavInfo, config.volume / 10, config, onEnded)
  }

  doPlay = async (wavInfo:CreatedWav, scaledVolume:number, config:SoundMakerConfig, onEnded:any) => {
    this.scaledVolume = scaledVolume
    this.wavInfo = wavInfo
    this.config = config
    this.sourceEnded = false
    this.sourceEndedCallBack = onEnded
    const endTime = this.getEndTime(wavInfo)
    this.getContext(endTime)
    this.setGainTimings(wavInfo, scaledVolume, config)

    // only do noise if not an offline recording
    if (!this.config.offline) {
      this.handleNoiseSettings(config)
    }

    // if its not an offline, we know by the endtime when it will end
    if (!this.config.offline) {
      setTimeout(() => {
        this.sourceEnded = true
        this.sourceEndedCallBack()
      }, endTime)
    } else {
      // offline so schedule the oscillator stop
      this.ssContext.oscillatorNode.stop(endTime / 1000)
      const renderedBuffer = await (this.ssContext.audioContext as OfflineAudioContext).startRendering()
      this.sourceEndedCallBack(renderedBuffer)
    }
  }

  getContext = (endTime:number) => {
    const makeNewContext = () => {
      this.ssContext = new SmoothedSoundsContext(this.config!.offline, endTime)
    }

    // no context, just create a new one
    if (!this.ssContext) {
      makeNewContext()
      return
    }

    // there's a context

    // last context was used for downloading, just use a fresh one
    if (this.ssContext.offline) {
      makeNewContext()
      return
    }

    // we're downloading, so use a fresh one
    if (this.config?.offline) {
      makeNewContext()
      return
    }

    // if we got this far we're just going to re-use the context, but rebuild if closed
    if (this.ssContext.contextClosed) {
      this.ssContext.rebuildAll()
    }
  }

  getEndTime = (wavInfo:CreatedWav) => {
    const l = wavInfo.timeLine.length
    const wordSpaceTime = wavInfo.timingUnits.wordSpaceMultiplier * wavInfo.timingUnits.calculatedFWUnitsMs
    const xtraWordSpaceDits = this.config!.xtraWordSpaceDits * wavInfo.timingUnits.calculatedFWUnitsMs * wavInfo.timingUnits.ditUnitMultiPlier
    return wavInfo.timeLine[l - 1].time + wordSpaceTime + xtraWordSpaceDits
  }

  forceStop = (pauseCallBack:any, killNoise:boolean) => {
    if (!this.ssContext) {
      pauseCallBack()
    } else {
      if (killNoise) {
        this.stopNoise()
      }
      if (this.ssContext) {
        if (!this.sourceEnded) {
          this.sourceEndedCallBack = pauseCallBack
          this.ssContext.stopAndCloseContext()
        } else {
          pauseCallBack()
        }
      } else {
        pauseCallBack()
      }
    }
  }

  getWav = (config: SoundMakerConfig):Promise<number[]> => {
    const myPromise:Promise<number[]> = new Promise((resolve, reject) => {
      config.offline = true
      this.play(config, (renderedBuffer:AudioBuffer) => {
        this.sourceEnded = true
        // console.log('renderedbuffer')
        // console.log(renderedBuffer)
        // console.log('ended')
        const myWav = audioBufferToWav(renderedBuffer)
        // console.log('towav')
        // console.log(myWav)
        resolve(myWav as unknown as number[])
      })
      // const wav = MorseStringToWavBuffer.createWav(config, true)
      // resolve(wav.wav)
    })
    return myPromise
  }
}
