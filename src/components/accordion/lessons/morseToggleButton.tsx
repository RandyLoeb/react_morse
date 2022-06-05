import { observer } from "mobx-react"
import SimpleMorseImage from "../../image/simpleMorseImage"
import ToggleMorseImage from "../../image/toggleMorseImage"
import { IMorseStoreProps } from "../../IMorseStoreProps"

export interface IMorseToggleButtonProps extends IMorseStoreProps {
    label:string
    id:string
    isChecked:boolean
    onChange:any
    btnColoring:string
    toggle:boolean
    style?:React.CSSProperties
    pic?:string
    altTruePic?:string
    altFalsePic?:string
    height?:number
    width?:number
}

const MorseToggleButton = observer(({height, width, altTruePic, altFalsePic, pic, style, toggle, btnColoring, onChange, isChecked, id, label, morseStore}:IMorseToggleButtonProps) => {

    const className:string = `btn ${btnColoring}`
    let picOut = <></>
    if (pic) {
        picOut = <><SimpleMorseImage pic={pic} morseStore={morseStore} />&nbsp;</>
    }

    return (
<>
<input type="checkbox" className="btn-check" autoComplete="off" id={id} checked={isChecked} onChange={()=>onChange()}/>
<label className={className} htmlFor={id} style={style}>{picOut}{label}&nbsp;
<ToggleMorseImage truePic={altTruePic ? altTruePic : 'checkImage'} 
falsePic={altFalsePic ? altFalsePic : 'circleImage'} toggle={toggle} morseStore={morseStore}
height={height} width={width} />
</label>
</>
    )
})

export default MorseToggleButton