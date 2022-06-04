import { observer } from "mobx-react";
import { Fragment } from "react";
import SimpleMorseImage, { ISimpleMorseImageProps } from "../image/simpleMorseImage";
import { IMorseStoreProps } from "../IMorseStoreProps";

export interface ISimpleNumberInputProps extends IMorseStoreProps, ISimpleMorseImageProps {
    value:number
    onChange:any
    maxWidth?:string
    minWidth?:string
    text:string
    max?:number
    min?:number
    id?:string
    step?:number
}

const SimpleNumberInput =observer(({step, id,pic, max, min, value, onChange, maxWidth, minWidth, text, height, width, morseStore}:ISimpleNumberInputProps) => {
    const nbsp = <>{text}<>&nbsp;</></>
    return(
    <>
    <span className="input-group-text">{text && nbsp}
        <SimpleMorseImage pic={pic} height={height} width={width} morseStore={morseStore} />
    </span>
    <input id={id} type="number" style={{maxWidth, minWidth}} className="form-control"
    aria-label="Username" min={min} max={max} value={value} step={step} onChange={onChange}/>
    
    </>
)})

export default SimpleNumberInput