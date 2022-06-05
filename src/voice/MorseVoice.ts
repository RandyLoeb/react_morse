import { MorseVoiceInfo } from './MorseVoiceInfo'
import { makeAutoObservable } from "mobx"
export class MorseVoice {
  voices = []
  voicesInited:boolean = false
  
  voiceCapable:boolean
  
  voiceVoice:any
  
  voiceVoices:any[]
  voiceBuffer:any[]
  voiceLang:string

  constructor () {
    makeAutoObservable(this)
    this.voiceCapable = (typeof speechSynthesis !== 'undefined')
    
    
    
    this.voiceLang = 'en-us'
    this.voiceVoices = []
    this.voiceBuffer = []
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.addEventListener('voiceschanged', () => this.populateVoiceList())
    }
    this.populateVoiceList()
  }

  populateVoiceList = () => {
    if (typeof speechSynthesis === 'undefined') {
      return
    }

    const voicesTry = speechSynthesis.getVoices()

    if (voicesTry.length > 0) {
      this.voices = voicesTry
      // console.log(this.voices)
      this.voiceVoices=this.voices
    }
  }

  getVoices = () => {
    // we assume this is all ready through the constructor by the time we use it
    const voices = speechSynthesis.getVoices()
    console.log(voices)
    return voices
  }

  initUtterance = (morseVoiceInfo) => {
    const utterance = new SpeechSynthesisUtterance()
    utterance.voice = morseVoiceInfo.voice || null // Note: some voices don't support altering params
    // utterance.voiceURI = morseVoiceInfo.voice && morseVoiceInfo.voice.voiceURI ? morseVoiceInfo.voice.voiceURI : 'native'
    utterance.volume = morseVoiceInfo.volume // 0 to 1
    utterance.rate = morseVoiceInfo.rate // 0.1 to 10
    utterance.pitch = morseVoiceInfo.pitch // 0 to 2
    utterance.text = morseVoiceInfo.textToSpeak
    utterance.lang = morseVoiceInfo.voice && morseVoiceInfo.voice.lang ? morseVoiceInfo.voice.lang : 'en-US'
    return utterance
  }

  speakInfo = (morseVoiceInfo) => {
    const utterance = this.initUtterance(morseVoiceInfo)
    utterance.addEventListener('end', morseVoiceInfo.onEnd)
    window.speechSynthesis.speak(utterance)
  }

  /* speakPhrase = (phraseToSpeak:string, onEndCallBack) => {
    const morseVoiceInfo = new MorseVoiceInfo()
    morseVoiceInfo.textToSpeak = phraseToSpeak
    morseVoiceInfo.voice = this.voiceVoice()
    morseVoiceInfo.volume = this.voiceVolume() / 10
    morseVoiceInfo.rate = this.voiceRate()
    morseVoiceInfo.pitch = this.voicePitch()
    morseVoiceInfo.onEnd = onEndCallBack
    this.speakInfo(morseVoiceInfo)
  } */
}
