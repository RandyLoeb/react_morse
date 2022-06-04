import { observer } from "mobx-react"

export interface ILessonSelectionProps {
    display:string
    checkedDisplay:string
    onRadioClick:any
    key:string
    inputName:string
    labelName:string
}
const LessonRadioTarget = observer(({display, checkedDisplay, onRadioClick, inputName, labelName}:ILessonSelectionProps) => {
    const name = inputName
    const inputId = `${name}_${display}`
    const id= `${labelName}_${display}`
    return(
        <>
<input type="radio" className="btn-check" name={name} key={inputId} id={inputId}
 value={display} defaultChecked={display === checkedDisplay} autoComplete="off" onClick={() => onRadioClick(display)} />
<label id={id} key={id} className="btn btn-outline-primary" htmlFor={inputId}
 >{display}</label>
    </>
)})

export default LessonRadioTarget