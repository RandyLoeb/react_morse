import { observer } from "mobx-react"
import SimpleMorseImage from "../image/simpleMorseImage"
import ToggleMorseImage from "../image/toggleMorseImage"
import { IMorseStoreProps } from "../IMorseStoreProps"
import {runInAction} from "mobx"
import { ChangeEventHandler } from "react"

const WorkingTextArea =observer(({morseStore}:IMorseStoreProps) => {

    const changeShowRaw = () => {
        runInAction(()=>morseStore.showRaw = !morseStore.showRaw)
    }

    const clearRawText = () => {
        runInAction(()=>morseStore.rawText = '')
    }

    const changeRawText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        runInAction(()=>morseStore.rawText = e.target.value)
    }

    const initUpload = () => {
        (document.getElementById('txtfiletoread') as HTMLElement).click()
    }

    const inputFileChange = () => {
        // thanks to https://newbedev.com/how-to-access-file-input-with-knockout-binding
        // console.log(file)
        const element = (document.getElementById('txtfiletoread') as HTMLInputElement)
        if (!element.files) return
        const file = element.files[0];
        console.log(element.value)
        const fr = new FileReader()
        fr.onload = (data) => {
          runInAction(()=>morseStore.rawText = (data.target?.result as string));
          // this.setText(data.target.result as string)
          // need to clear or else won't fire if use clears the text area
          // and then tries to reload the same again
          (element.value as any) = null
        }
        fr.readAsText(file)
      }
return (
<div className="col">
    <div className="row">
        <div className="col">
            <div className="input-group">
                <span className="input-group-text" onClick={changeShowRaw}>
                    <div className="container gx-0 px-0">
                        <div className="row row-cols-1 justify-content-center">
                            <div className="col-md-auto">
                                <ToggleMorseImage height={32} width={32} morseStore={morseStore} toggle={morseStore.showRaw} truePic='eyeImage' falsePic="eyeslashImage" />
                            </div>
                        </div>

                        <div className="row row-cols-1 gx-0">
                            <div className="col-auto text-end" style={{width: "60px"}}>
                                <span>Est 
                                    <SimpleMorseImage height={15} width={15} pic={"stopwatchImage"} morseStore={morseStore} />
                                    :&nbsp;</span>
                            </div>
                            <div className="col-auto">
                                <span data-bind="text: timeEstimate().minutes"></span>:<span
                                    data-bind="text: timeEstimate().normedSeconds"></span>
                            </div>
                        </div>

                        <div className="row row-cols-1 gx-0">
                            <div className="col-auto text-end" style={{width: "60px"}}>
                                <span>Play 
                                <SimpleMorseImage height={15} width={15} pic={"stopwatchImage"} morseStore={morseStore} />:&nbsp;</span>
                            </div>
                            <div className="col-auto">
                                <span data-bind="text: playingTime().minutes"></span>:<span
                                    data-bind="text: playingTime().normedSeconds"></span>
                            </div>
                        </div>

                    </div>
                </span>

                <textarea disabled={!morseStore.showRaw} value={morseStore.showRaw ? morseStore.rawText : ''} onChange={changeRawText} className="form-control"
                    aria-label="Text"></textarea>
            </div>
        </div>

        <div className="col-md-auto">
            <div className="btn-group-vertical">
                <button id="btnClearText" className="btn btn-light" onClick={clearRawText}>
                <SimpleMorseImage height={20} width={20} pic={"trashImage"} morseStore={morseStore} />
                    &nbsp;Clear</button>
                <label id="lblLoadTextFile" htmlFor="txtfiletoread"><button id="btnLoadTextFile"
                        className="btn btn-light" onClick={initUpload} data-bind="getElementById('txtfiletoread').click()">
                <SimpleMorseImage height={20} width={20} pic={"arrowleftImage"} morseStore={morseStore} />
                            
                            &nbsp;Insert File</button></label>

                <input type="file" accept=".txt" id="txtfiletoread" className="form-control"
                    onChange={inputFileChange} hidden/>

            </div>
        </div>

    </div>
</div>
)})

export default WorkingTextArea