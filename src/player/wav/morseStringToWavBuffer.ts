import MorseCWWave from '../../morse-pro/morse-pro-cw-wave.js'
import * as RiffWave from '../../morse-pro/morse-pro-util-riffwave.js'
import { MorseCountUnits } from '../../timing/MorseCountUnits'
import { MorseTimingCalculator } from '../../timing/morseTimingCalculator'
import { CreatedWav } from './CreatedWav'
import { SoundMakerConfig } from '../soundmakers/SoundMakerConfig'

export class MorseStringToWavBuffer {
  static getInit = (config:SoundMakerConfig) => {
    const useProsigns = true
    const sampleRate = 8000
    const timingUnits = MorseTimingCalculator.getTimingUnits(config.wpm, config.fwpm)
    const countUnits = new MorseCountUnits()
    countUnits.extraWordSpacingDitsCount = config.xtraWordSpaceDits
    // const unit = 1200 / config.fwpm
    // const wordSpace = (unit * 7) + (unit * config.xtraWordSpaceDits)
    const morseCWWave = new MorseCWWave(useProsigns, config.wpm, config.fwpm, { dit: config.ditFrequency, dah: config.dahFrequency }, sampleRate)
    morseCWWave.translate(config.word, false)
    return { morseCWWave, timingUnits, countUnits }
  }

  static createWav = (config:SoundMakerConfig, generateSampleAndWav:boolean):CreatedWav => {
    const init = this.getInit(config)
    const ret = new CreatedWav()
    // get wordspace
    const calcs = MorseTimingCalculator.getTimes(init.timingUnits, init.countUnits)
    const timeLine = MorseTimingCalculator.getTimeLine(init.morseCWWave, init.timingUnits, config)

    if (generateSampleAndWav) {
      ret.sample = init.morseCWWave.getSample(calcs.singleWordSpaceTime, config.prePaddingMs)
      const wav = RiffWave.getData(ret.sample)
      ret.wav = wav
    }

    ret.timeLine = timeLine
    ret.timingUnits = init.timingUnits
    return ret
  }

  static estimatePlayTime = (config:SoundMakerConfig) => {
    const init = this.getInit(config)
    const timingUnits = init.timingUnits
    const unitCounts = MorseTimingCalculator.countUnits(init.morseCWWave, init.countUnits)
    const timeCalcs = MorseTimingCalculator.getTimes(timingUnits, unitCounts)
    const timeLine = MorseTimingCalculator.getTimeLine(init.morseCWWave, timingUnits, config)

    return { morse: init.morseCWWave.morse, word: config.word, timingUnits, unitCounts, timeCalcs, timeLine }
  }
}
