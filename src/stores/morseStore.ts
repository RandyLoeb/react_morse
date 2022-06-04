
import { makeAutoObservable } from "mobx"
import { MorseLoadImages } from "./morseLoadImages"
export class MorseStore {
    isDev:boolean
    morseLoadImages:MorseLoadImages
    wpm: number
    fwpm: number
    volume:number
    syncWpm:boolean
    rawText:string
    showRaw:boolean
    constructor () {
        this.morseLoadImages = new MorseLoadImages()
        makeAutoObservable(this, {morseLoadImages: false})
        this.isDev = false
        this.wpm = 20
        this.fwpm = 20
        this.volume = 10
        this.syncWpm = true
        this.rawText = 'CQ LICW'
        this.showRaw = true
    }
}