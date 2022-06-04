
import { makeAutoObservable } from "mobx"
import { MorseLessonStore } from "./lessons/morseLessonStore"
import { MorseLoadImages } from "./morseLoadImages"
export class MorseStore {
    lessons:MorseLessonStore
    isDev:boolean
    morseLoadImages:MorseLoadImages
    wpm: number
    fwpm: number
    volume:number
    syncWpm:boolean
    rawText:string
    showRaw:boolean
    flaggedWords:string
    get flaggedWordsCount ():number {
        if (!this.flaggedWords.trim()) {
          return 0
        }
        return this.flaggedWords.trim().split(' ').length
    }
    constructor () {
        this.morseLoadImages = new MorseLoadImages()
        this.lessons = new MorseLessonStore(()=>{},()=>{})
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
}