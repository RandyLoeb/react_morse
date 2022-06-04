import { observer } from "mobx-react"
import ToggleMorseImage, { IToggleMorseImageProps } from "../../image/toggleMorseImage"
import { IMorseStoreProps } from "../../IMorseStoreProps"

export interface ILessonToggleButtonProps extends IMorseStoreProps {
    label:string
    id:string
    isChecked:boolean
    onChange:any
    btnColoring:string
    toggle:boolean
    style?:React.CSSProperties
}

const LessonToggleButton = observer(({style, toggle, btnColoring, onChange, isChecked, id, label, morseStore}:ILessonToggleButtonProps) => {

    const className:string = `btn ${btnColoring}`
    return (
<>
<input type="checkbox" className="btn-check" autoComplete="off" id={id} checked={isChecked} onChange={()=>onChange()}/>
<label className={className} htmlFor={id} style={style}>{label}&nbsp;
<ToggleMorseImage truePic='checkImage' falsePic='circleImage' toggle={toggle} morseStore={morseStore} />
</label>
</>
    )
})

export default LessonToggleButton