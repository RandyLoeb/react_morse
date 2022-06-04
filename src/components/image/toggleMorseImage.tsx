
import { observer } from "mobx-react-lite";
import { IMorseStoreProps } from "../IMorseStoreProps";

export interface IToggleMorseImageProps extends IMorseStoreProps{
    height?:number
    width?:number
    toggle:boolean
    truePic:string
    falsePic:string
}
const ToggleMorseImage =observer(({height, width, toggle, truePic, falsePic, morseStore}:IToggleMorseImageProps) => {
        const srcName=toggle ? truePic : falsePic
        const src = morseStore.morseLoadImages.getSrc(srcName)
        return (
        <img alt={srcName} height={height} width={width} src={src}/>)

})

export default ToggleMorseImage