
import { makeAutoObservable } from "mobx"
import { MorseWordPlayer } from "../player/morseWordPlayer"
import { NoiseConfig } from "../player/soundmakers/NoiseConfig"
import { SoundMakerConfig } from "../player/soundmakers/SoundMakerConfig"
import MorseStringUtils from "../utils/morseStringUtils"
import { MorseLessonStore } from "./lessons/morseLessonStore"
import { MorseLoadImages } from "./morseLoadImages"
export class MorseStore {
    lessons:MorseLessonStore
    isDev:boolean
    morseLoadImages:MorseLoadImages
    wpm: number
    fwpm: number
    ditFrequency:number = 450
    dahFrequency:number =450 
    volume:number
    syncWpm:boolean
    rawText:string
    showRaw:boolean
    flaggedWords:string

    preSpaceUsed:boolean = false
    preSpace:number =0
    xtraWordSpaceDits:number =0
    noiseEnabled:boolean = false
    noiseType:string =''
    noiseVolume:number = 0
    playerPlaying:boolean = false
    riseTimeConstant:number=.001
    decayTimeConstant:number=.001
    riseMsOffset:number=1.5
    decayMsOffset:number=1.5
    morseWordPlayer:MorseWordPlayer



    get flaggedWordsCount ():number {
        if (!this.flaggedWords.trim()) {
          return 0
        }
        return this.flaggedWords.trim().split(' ').length
    }
    constructor () {
        this.morseLoadImages = new MorseLoadImages()
        this.morseWordPlayer = new MorseWordPlayer()
        this.lessons = new MorseLessonStore((str)=>{this.rawText = str},(str) => {
            const config = this.getMorseStringToWavBufferConfig(str)
            const est = this.morseWordPlayer.getTimeEstimate(config)
            return est
          })
        makeAutoObservable(this, {morseLoadImages: false})
        this.isDev = false
        this.wpm = 20
        this.fwpm = 20
        this.volume = 10
        this.syncWpm = true
        this.rawText = 'CQ LICW'
        this.showRaw = true
        this.flaggedWords = ''
    }

    getMorseStringToWavBufferConfig = (text) => {
        const config = new SoundMakerConfig()
        config.word = MorseStringUtils.doReplacements(text)
        config.wpm = parseInt(this.wpm as any)
        config.fwpm = parseInt(this.fwpm as any)
        config.ditFrequency = parseInt(this.ditFrequency as any)
        config.dahFrequency = parseInt(this.dahFrequency as any)
        config.prePaddingMs = this.preSpaceUsed ? 0 : this.preSpace * 1000
        config.xtraWordSpaceDits = parseInt(this.xtraWordSpaceDits as any)
        config.volume = parseInt(this.volume as any)
        config.noise = new NoiseConfig()
        config.noise.type = this.noiseEnabled ? this.noiseType : 'off'
        config.noise.volume = parseInt(this.noiseVolume as any)
        config.playerPlaying = this.playerPlaying
        config.riseTimeConstant = parseFloat(this.riseTimeConstant as any)
        config.decayTimeConstant = parseFloat(this.decayTimeConstant as any)
        config.riseMsOffset = parseFloat(this.riseMsOffset as any)
        config.decayMsOffset = parseFloat(this.decayMsOffset as any)
        return config
      }
}