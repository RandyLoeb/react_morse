import { observer } from "mobx-react"
import SimpleMorseImage from "../../image/simpleMorseImage"
import { IMorseStoreProps } from "../../IMorseStoreProps"
import {runInAction} from "mobx"

const FlaggedWordsAccordion = observer(({morseStore}:IMorseStoreProps) => {

    const changeRawText = () => {
        runInAction(()=>morseStore.rawText = morseStore.flaggedWords)
    }

    const changeFlaggedWords = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        runInAction(()=>morseStore.flaggedWords = e.target.value)
    }

    return (
<div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
            aria-expanded="false" aria-controls="collapseTwo" id="btnFlaggedWordsAccordianButton">
            <SimpleMorseImage pic="flagImage" height={20} width={20} morseStore={morseStore} />
            <span>&nbsp;</span>
            Flagged words (click words you missed in the word list to toggle adding them
            here)<span>&nbsp;</span><span className="badge bg-success">{morseStore.flaggedWordsCount} </span>
        </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample">
        <div className="accordion-body">
            <div className="input-group">
                <span id="btnSetFlagged" className="input-group-text" onClick={changeRawText}>
                    <SimpleMorseImage height={20} width={20} pic='uploadImage' morseStore={morseStore} />
                    &nbsp;Load
                    As
                    Text</span>
                <textarea value={morseStore.flaggedWords} onChange={changeFlaggedWords} className="form-control"
                    aria-label="Text"></textarea>

            </div>
        </div>
    </div>
</div>

    )
})

export default FlaggedWordsAccordion