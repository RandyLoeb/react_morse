import { observer } from "mobx-react"

export interface ILessonButtonSelectionProps {
    display:string
    checkedDisplay:string
    onClick:any
    key:string
    inputName:string
    
}
const LessonButtonTarget = observer(({display, checkedDisplay, onClick, inputName}:ILessonButtonSelectionProps) => {
    const name = inputName
    const inputId = `${name}_${display}`
    const classNameBase = 'list-group-item list-group-item-action'
    const active = (display === checkedDisplay) ? ' active' : ''
    const displayClass = `${classNameBase}${active}`
    return(
        <>
<button id={inputId} key={inputId} type="button" className={displayClass}
onClick={()=>onClick()}>
{display}    
</button>
    </>
)})

export default LessonButtonTarget