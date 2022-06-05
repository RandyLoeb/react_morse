
import { observer } from "mobx-react-lite";
import { IMorseStoreProps } from "../IMorseStoreProps";

export interface ISimpleMorseImageProps extends IMorseStoreProps{
    height?:number
    width?:number
    pic:string
    
}
const SimpleMorseImage =observer(({height, width, pic,  morseStore}:ISimpleMorseImageProps) => {
        const src = morseStore.morseLoadImages.getSrc(pic)
        return (
        <img alt={pic} height={height} width={width} src={src}/>)

})

export default SimpleMorseImage 
