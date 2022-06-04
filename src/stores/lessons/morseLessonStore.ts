import IFileOptionsInfo from "./fileOptionsInfo"
import { MorseLessonFileFinder } from "../morseLessonFileFinder"
import WordListsJson from '../../wordfilesconfigs/wordlists.json'
import { makeAutoObservable, runInAction } from "mobx"


export class MorseLessonStore {
    autoCloseLessonAccordion:boolean
    userTarget:string
    selectedClass:string
    // userTargetInitialized:boolean
    // selectedClassInitialized:boolean
    // letterGroupInitialized:boolean
    // displaysInitialized:boolean
    letterGroup:string
    selectedDisplay:any
    wordLists:IFileOptionsInfo[]
    // morseSettings:MorseSettings
    setText:any
    ifStickySets:boolean
    stickySets:string
    randomizeLessons:boolean
    ifOverrideTime:boolean
    overrideMins:number
    customGroup:string
    ifOverrideMinMax:boolean
    /* trueOverrideMin:number
    trueOverrideMax:number */
    overrideMin:number
    overrideMax:number
    syncSize:boolean
    getTimeEstimate:any
    // classes:ko.Computed<Array<any>>
    // userTargets:ko.Computed<Array<any>>
    // letterGroups:ko.Computed<Array<any>>
    // displays:ko.Computed<Array<any>>
    autoCloseCookieName:string
  
    get userTargets () {
        const targs:string[] = []
        this.wordLists.forEach((x) => {
          if (!targs.find((y) => y === x.userTarget)) {
            targs.push(x.userTarget)
          }
        })
        return targs
    }
  
    get classes () {
        const cls:string[] = []
        this.wordLists.forEach((x) => {
          if (!cls.find((y) => y === x.class)) {
            cls.push(x.class)
          }
        })
        return cls
    }
  
    get letterGroups () {
        // this.letterGroupInitialized = false
        runInAction(()=>{ this.letterGroup = ''})
        const lgs:string[] = []
        if (this.selectedClass === '' || this.userTarget === '') {
          const missing = []
          if (this.selectedClass === '') {
            missing.push('class')
          }
          if (this.userTarget === '') {
            missing.push('user')
          }
          return [`Select ${missing.join(', ')}`]
        }
        this.wordLists.filter((list) => list.class === this.selectedClass && list.userTarget === this.userTarget)
          .forEach((x) => {
            if (!lgs.find((y) => y === x.letterGroup)) {
              lgs.push(x.letterGroup)
            }
          })
        return lgs
    }
  
    get displays ()  {
        // this.displaysInitialized = false
        runInAction(()=>this.selectedDisplay={})
        const dps:IFileOptionsInfo[] = []
        if (this.selectedClass === '' || this.userTarget === '' || this.letterGroup === '') {
          return [{ display: 'Select wordlist', fileName: 'dummy.txt', isDummy: true }]
        }
        this.wordLists.filter((list) => list.class === this.selectedClass &&
               list.userTarget === this.userTarget &&
               list.letterGroup === this.letterGroup)
          .forEach((x) => {
            if (!dps.find((y) => y.display === x.display)) {
              dps.push(x)
            }
          })
        return dps
    }

    constructor (setTextCallBack:any, timeEstimateCallback:any) {
      makeAutoObservable(this)
      // MorseCookies.registerHandler(this)
      this.autoCloseCookieName = 'autoCloseLessonAccordian'
      // this.morseSettings = morseSettings
      this.autoCloseLessonAccordion = false// ko.observable(false).extend({ saveCookie: this.autoCloseCookieName } as ko.ObservableExtenderOptions<boolean>)
      this.userTarget = ''
      this.selectedClass = ''
      // this.userTargetInitialized = false
      // this.selectedClassInitialized = false
      // this.letterGroupInitialized = false
      // this.displaysInitialized = false
      this.letterGroup = ''
      this.selectedDisplay = {}
      this.wordLists = []
      this.setText = setTextCallBack
      this.getTimeEstimate = timeEstimateCallback
      this.ifStickySets = true
      this.stickySets = ''
      this.randomizeLessons = true
      this.ifOverrideTime = false
      this.overrideMins = 2
      this.customGroup = ''
      this.ifOverrideMinMax = false
      this.overrideMin = 3
      this.overrideMax = 3
      this.syncSize = true
  
      /* this.overrideMin = ko.pureComputed({
        read: () => {
          return this.trueOverrideMin()
        },
        write: (value) => {
          this.trueOverrideMin(value)
          if (this.syncSize()) {
            this.trueOverrideMax(value)
          }
        },
        owner: this
      })
  
      this.overrideMax = ko.pureComputed({
        read: () => {
          if (!this.syncSize()) {
            return this.trueOverrideMax()
          } else {
            this.trueOverrideMax(this.trueOverrideMin())
            return this.trueOverrideMin()
          }
        },
        write: (value) => {
          if (value >= this.trueOverrideMin()) {
            this.trueOverrideMax(value)
          }
        },
        owner: this
      }) */
  
      this.initializeWordList()
    }
  
    // end constructor
    doCustomGroup = () => {
      if (this.customGroup) {
        const data = { letters: this.customGroup.trim().replace(/ /g, '') }
        this.randomWordList(data, true)
        // this.closeLessonAccordianIfAutoClosing()
      }
    }
  
    randomWordList = (data:any, ifCustom:boolean) => {
      let str = ''
      const splitWithProsignsAndStcikys = (s:string) => {
        let stickys = ''
        if (this.ifStickySets && this.stickySets.trim()) {
          stickys = '|' + this.stickySets.toUpperCase().trim().replace(/ {2}/g, ' ').replace(/ /g, '|')
        }
  
        const regStr = `<.*?>${stickys}|[^<.*?>]|\\W`
        // console.log(regStr)
        const re = new RegExp(regStr, 'g')
        const match = s.toUpperCase().match(re)
        // console.log(match)
        return match
      }
      const chars = splitWithProsignsAndStcikys(data.letters)
      let seconds = 0
      const controlTime = (this.ifOverrideTime || ifCustom) ? (this.overrideMins * 60) : data.practiceSeconds
      const minWordSize = (this.ifOverrideMinMax || ifCustom) ? this.overrideMin : data.minWordSize
      const maxWordSize = (this.ifOverrideMinMax || ifCustom) ? this.overrideMax : data.maxWordSize
      // Fn to generate random number min/max inclusive
      // https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
      const randomNumber = (min:number, max:number) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
  
      do {
        let word = ''
  
        if (this.randomizeLessons) {
          // determine word length
          const wordLength = minWordSize === maxWordSize ? minWordSize : randomNumber(minWordSize, maxWordSize)
  
          for (let j = 1; j <= wordLength; j++) { // for each letter
            // determine the letter
            if (chars) {
                word += chars[randomNumber(1, chars.length) - 1]
            }
          }
        } else {
          word = data.letters
        }
  
        str += seconds > 0 ? (' ' + word.toUpperCase()) : word.toUpperCase()
  
        const est = this.getTimeEstimate(str)
        seconds = est.timeCalcs.totalTime / 1000
      } while (seconds < controlTime)
  
      this.setText(str)
    }
  
    getWordList = (filename:string) => {
      const isText = filename.endsWith('txt')
      console.log(`isText:${isText}`)
      const afterFound = (result:any) => {
        if (result.found) {
          if (isText) {
            console.log(result)
            this.setText(result.data)
          } else {
            this.randomWordList(result.data, false)
          }
        } else {
          this.setText(`ERROR: Couldn't find ${filename} or it lacks .txt or .json extension.`)
        }
      }
  
      MorseLessonFileFinder.getMorseLessonFile(filename, afterFound)
    }
  
    /* setUserTargetInitialized = () => {
      this.userTargetInitialized = true
    }
  
    setSelectedClassInitialized = () => {
      this.selectedClassInitialized = true
    }
  
    setLetterGroupInitialized = () => {
      // console.log('setlettergroupinitialized')
      this.letterGroupInitialized = true
    }
  
    setDisplaysInitialized = () => {
      this.displaysInitialized = true
    } */
  
    /* changeUserTarget = (userTarget:string) => {
      if (this.userTargetInitialized) {
        this.userTarget(userTarget)
        // console.log('usertarget')
      }
    }
  
    changeSelectedClass = (selectedClass:string) => {
      if (this.selectedClassInitialized) {
        this.selectedClass(selectedClass)
      }
    }
  
    setLetterGroup = (letterGroup:string) => {
      if (this.letterGroupInitialized) {
        console.log('setlettergroup')
        this.letterGroup(letterGroup)
      }
    }
  
    closeLessonAccordianIfAutoClosing = () => {
      if (this.autoCloseLessonAccordion()) {
        const elem = document.getElementById('lessonAccordianButton')
        elem.click()
      }
    } */
  
    setDisplaySelected = (display:any) => {
      if (!display.isDummy) {
        // if (this.displaysInitialized) {
          this.selectedDisplay = display
          //this.morseSettings.misc.newlineChunking(display.newlineChunking)
          // setText(`when we have lesson files, load ${selectedDisplay().fileName}`)
          this.getWordList(this.selectedDisplay.fileName)
          //this.closeLessonAccordianIfAutoClosing()
        // }
      }
    }
  
    initializeWordList = () => {
      this.wordLists=WordListsJson.fileOptions
    }
  
    /* // cookie handling
    handleCookies = (cookies: Array<CookieInfo>) => {
      if (!cookies) {
        return
      }
      const target:CookieInfo = cookies.find(x => x.key === this.autoCloseCookieName)
      if (target) {
        this.autoCloseLessonAccordion(GeneralUtils.booleanize(target.val))
      }
    }
  
    handleCookie = (cookie: string) => {} */
  }