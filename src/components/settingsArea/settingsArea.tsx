import { IMorseStoreProps } from "../IMorseStoreProps";
import { observer } from "mobx-react-lite";
import React from "react";
import {runInAction} from "mobx"
import ToggleMorseImage from "../image/toggleMorseImage";
import SimpleNumberInput from "../inputs/simpleNumberInput";

const TitleHeader =observer(({morseStore}:IMorseStoreProps) => {

        const changeWpm = (e:React.ChangeEvent<HTMLInputElement>) => {
            runInAction(()=> {
            morseStore.wpm = parseInt(e.target.value)
            if (morseStore.syncWpm) {
                morseStore.fwpm = morseStore.wpm
            }
        })
        }

        const changeFwpm = (e:React.ChangeEvent<HTMLInputElement>) => {
            runInAction(()=>morseStore.fwpm = parseInt(e.target.value))
        }

        const changeVolume = (e:React.ChangeEvent<HTMLInputElement>) => {
            runInAction(()=>morseStore.volume = parseInt(e.target.value))
        }

        const changeSyncWpm = () => {
            runInAction(()=>{
                morseStore.syncWpm = !morseStore.syncWpm
                if (morseStore.syncWpm) {
                    morseStore.fwpm = morseStore.wpm
                }
            })
        }

        const maxWidth = "75px"
        return (
        <div className="col">
            <div className="row row-cols-2 gx-2 gy-2">
                
                <div className="col-md-auto">
                    <div className="input-group">
                        
                        <SimpleNumberInput height={20} width={20} morseStore={morseStore} onChange={changeWpm}
                        pic="speedometerImage" text={"WPM"} value={morseStore.wpm} min={1} maxWidth={maxWidth} 
                        minWidth={maxWidth} /> 

                        <span className="input-group-text" onClick={changeSyncWpm} >FWPM&nbsp;
                        <ToggleMorseImage truePic="lockImage" falsePic="unlockImage" toggle={morseStore.syncWpm} height={20} width={20} morseStore={morseStore} />
                        </span>
                        <input type="number" style={{maxWidth:"75px" , minWidth: "75px"}} className="form-control"
                            aria-label="Server" min="1"
                            value={morseStore.fwpm}
                            max={morseStore.wpm}
                            disabled={morseStore.syncWpm} 
                            onChange={changeFwpm}
                            />
                    </div>
                </div>
                


                <div className="col-md-auto">
                    <div className="input-group">

                        <SimpleNumberInput id="txtVolume" height={20} width={20} morseStore={morseStore} onChange={changeVolume}
                        pic="volumeImage" text={""} value={morseStore.volume} min={1} max={10} maxWidth={maxWidth} 
                        minWidth={maxWidth} /> 

                    </div>
                </div>


            </div>
        </div>
)})

export default TitleHeader