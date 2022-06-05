import { observer } from "mobx-react"
import SimpleMorseImage from "../../image/simpleMorseImage"
import { IMorseStoreProps } from "../../IMorseStoreProps"
import {runInAction} from "mobx"
import ToggleMorseImage from "../../image/toggleMorseImage"
import SimpleNumberInput from "../../inputs/simpleNumberInput"
import MorseToggleButton from "../lessons/morseToggleButton"


const MorseSettingsAccordion = observer(({morseStore}:IMorseStoreProps) => {

    return(
<div className="accordion-item">
    <h2 className="accordion-header" id="headingmoresettings">
        <button id="moreSettingsAccordionButton" className="accordion-button collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target="#collapsemoresettings" aria-expanded="false"
            aria-controls="collapsemoresettings">
            <SimpleMorseImage morseStore={morseStore} height={20} width={20} pic='gearImage' />
            <span>&nbsp;</span>
            More Settings<span>&nbsp;</span>
        </button>
    </h2>
    <div id="collapsemoresettings" className="accordion-collapse collapse"
        aria-labelledby="headingmoresettings" data-bs-parent="#accordionExample">
        <div className="accordion-body">

            <div className="row row-cols-5 gx-2 gy-2">

                
                <div className="col-auto">
                    <div className="input-group">
                        <SimpleNumberInput pic="musicnoteImage" height={20} width={20} minWidth="75px" maxWidth="75px"
                        morseStore={morseStore} value={morseStore.ditFrequency} text="DIT" min={100} max={1200}
                        step={10} onChange={(e)=>runInAction(()=>{
                            morseStore.ditFrequency=e.target.value
                            if (morseStore.syncFreq) {
                                morseStore.dahFrequency=morseStore.ditFrequency
                            }
                        })}/>
                        
                        <span className="input-group-text"
                            onClick={()=>runInAction(()=>{
                                morseStore.syncFreq=!morseStore.syncFreq
                                if (morseStore.syncFreq) {
                                    morseStore.dahFrequency=morseStore.ditFrequency
                                }
                            })}
                            data-bind="click: ()=>settings.frequency.syncFreq(!settings.frequency.syncFreq())">DAH&nbsp;
                            <ToggleMorseImage truePic="lockImage" falsePic="unlockImage" morseStore={morseStore} toggle={morseStore.syncFreq}/>
                            
                        </span>
                        <input type="number" style={{maxWidth:"75px", minWidth: "75px"}}
                            className="form-control" aria-label="Server" min="100" max="1200" step="10"
                            disabled={morseStore.syncFreq}
                            value={morseStore.dahFrequency}
                            onChange={(e)=>runInAction(()=>morseStore.dahFrequency=(e.target.value as unknown as number))}
                        />
                    </div>
                </div>
                
                <div className="col-auto">
                    <div className="input-group">
                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="volumemuteImage" max={1200} min={0}
                        text="PRE" value={morseStore.preSpace} step={.5}
                        onChange={(e)=>runInAction(()=>morseStore.preSpace=e.target.value)} />

                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="graphuparrowImage" max={1200} min={0}
                        text="WORD SPACE" value={morseStore.xtraWordSpaceDits} step={1}
                        onChange={(e)=>runInAction(()=>morseStore.xtraWordSpaceDits=e.target.value)} />
                        
                    </div>
                </div>
                
                <div className="col-auto">
                    <div className="input-group">
                    <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="barchartImage" max={1200} min={1}
                        text="CARD SIZE" value={morseStore.cardFontPx} step={1}
                        onChange={(e)=>runInAction(()=>morseStore.cardFontPx=e.target.value)} />

                        
                    </div>
                </div>
                
                <div className="col-auto">
                    <div className="input-group">

                    <MorseToggleButton label="Trail" btnColoring="btn-outline-secondary" morseStore={morseStore} 
                                    isChecked={morseStore.trailReveal} id="btntrailReveal"
                                    toggle={morseStore.trailReveal} height={20} width={20}
                                    altTruePic="eyeImage" altFalsePic="eyeslashImage"
                                    onChange={(e)=>runInAction(()=>{morseStore.trailReveal = !morseStore.trailReveal})}/>
                        
                        
                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="50px" 
                        morseStore={morseStore} pic="stopwatchImage" min={0} enable={morseStore.trailReveal}
                        text="Pre Delay" value={morseStore.trailPreDelay} step={.25}
                        onChange={(e)=>runInAction(()=>morseStore.trailPreDelay=e.target.value)} />
                        
                        
                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="50px" 
                        morseStore={morseStore} pic="stopwatchImage" min={0} enable={morseStore.trailReveal}
                        text="Post Delay" value={morseStore.trailPostDelay} step={.25}
                        onChange={(e)=>runInAction(()=>morseStore.trailPostDelay=e.target.value)} />
                                                                    
                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="50px" 
                        morseStore={morseStore} pic="stopwatchImage" min={0} enable={morseStore.trailReveal}
                        text="Post Delay" value={morseStore.trailFinal} step={.25}
                        onChange={(e)=>runInAction(()=>morseStore.trailFinal=e.target.value)} />
                        
                    </div>
                </div>
                
                <div className="col-auto">

                <MorseToggleButton label="Cards" btnColoring="btn-outline-primary" morseStore={morseStore} pic="grid3x3gapImage"
                                    isChecked={morseStore.cardsVisible} id="btncheckcardsvisible"
                                    toggle={morseStore.cardsVisible}
                                    onChange={(e)=>runInAction(()=>{morseStore.cardsVisible = !morseStore.cardsVisible})}/>
                    
                </div>
                
                <div className="col-auto">
                    <button type="button" className="btn btn-success" data-bind="click: doDownload">
                        <SimpleMorseImage pic="downloadImage" morseStore={morseStore} />
                        Audio File
                    </button>
                    <a id="downloadLink"></a>
                </div>
                
                <div className="col-auto">

                <MorseToggleButton label="Expert Settings" btnColoring="btn-outline-danger" morseStore={morseStore} pic="exclamationoctagonImage"
                                    isChecked={morseStore.showExpertSettings} id="btncheckexpertsettings"
                                    toggle={morseStore.showExpertSettings}
                                    onChange={(e)=>runInAction(()=>{morseStore.showExpertSettings = !morseStore.showExpertSettings})}/>

                    
                </div>

        
                
                <div className="col-auto" hidden={!morseStore.showExpertSettings}>

                <MorseToggleButton label="Noise" btnColoring="btn-outline-primary" morseStore={morseStore} pic="soundwaveImage"
                                    isChecked={morseStore.noiseEnabled} id="btnchecknoise"
                                    toggle={morseStore.noiseEnabled}
                                    onChange={(e)=>runInAction(()=>{morseStore.noiseEnabled = !morseStore.noiseEnabled})}/>
                    
                </div>

                
                <div className="col-auto" hidden={!morseStore.showExpertSettings}>

                <MorseToggleButton label="RSS" btnColoring="btn-outline-primary" morseStore={morseStore} pic="rssImage"
                                    isChecked={morseStore.rssEnabled} id="btncheckrss"
                                    toggle={morseStore.rssEnabled}
                                    onChange={(e)=>runInAction(()=>{morseStore.rssEnabled = !morseStore.rssEnabled})}/>
                    
                </div>

                
                <div className="input-group">
                    <div className="col-auto" hidden={!morseStore.showExpertSettings}>

                    <MorseToggleButton label="Voice" btnColoring="btn-outline-primary" morseStore={morseStore} pic="chatquoteImage"
                                    isChecked={morseStore.voiceEnabled} id="btncheckvoice"
                                    toggle={morseStore.voiceEnabled}
                                    onChange={(e)=>runInAction(()=>{morseStore.voiceEnabled = !morseStore.voiceEnabled})}/>
                        
                    </div>
                    
                    {(morseStore.showExpertSettings && morseStore.voiceEnabled) && 
                    <div className="col-md-auto">
                        <div className="input-group">

                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="stopwatchImage" min={0} max={10}
                        text="Delay" value={morseStore.voiceThinkingTime} step={.25}
                        onChange={(e)=>runInAction(()=>morseStore.voiceThinkingTime=e.target.value)} />
                            
                        </div>
                    </div>
                    }
                    
                    {(morseStore.showExpertSettings && morseStore.voiceEnabled && morseStore.voice.voiceVoices.length) && 
                    <>
                    <div className="col-auto">
                    
                        <select className="form-select" onChange={(e)=>runInAction(()=>{
                            morseStore.voice.voiceVoice=e.target.value
                        })} >
                            
                            <option value="">Choose speaker...</option>
                            {morseStore.voice.voiceVoices.map((x)=>{
                                return <option key={x.name} value={x}>{x.name}</option>
                            })}
                            
                        </select>
                    </div>
                    </>
                    }
                    
                    {(morseStore.showExpertSettings && morseStore.voiceEnabled) && 
                    <>
                    <div className="col-md-auto">
                        <div className="input-group">
                            
                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="volumeImage" min={0} max={10} 
                        value={morseStore.voiceVolume} step={1}
                        onChange={(e)=>runInAction(()=>morseStore.voiceVolume=e.target.value)} />
                            
                        </div>
                    </div>
                    
                    
                    <div className="col-md-auto">
                        <div className="input-group">

                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="musicnoteImage" min={0} max={2}
                        text="Pitch" value={morseStore.voicePitch} step={.25}
                        onChange={(e)=>runInAction(()=>morseStore.voicePitch=e.target.value)} />

                            
                        </div>
                    </div>
                    
                    <div className="col-md-auto">
                        <div className="input-group">

                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="speedometerImage" min={.1} max={10} 
                        text="Pitch" value={morseStore.voiceRate} step={.1}
                        onChange={(e)=>runInAction(()=>morseStore.voiceRate=e.target.value)} />
                            
                        </div>
                    </div>
                    </>
                    }
                </div>
                
                
                <div className="input-group">
                    <div className="col-auto" hidden={!morseStore.showExpertSettings}>

                    <MorseToggleButton label="Smoothing" btnColoring="btn-outline-primary" morseStore={morseStore} pic="soundwaveImage"
                                    isChecked={morseStore.smoothing} id="btnchecksmoothing"
                                    toggle={morseStore.smoothing}
                                    data-bind="checked: smoothing, enable: !playerPlaying(), event: {change: changeSoundMaker}"
                                    onChange={(e)=>runInAction(()=>{morseStore.smoothing = !morseStore.smoothing})}/>

                        
                    </div>
                    
                    {(morseStore.showExpertSettings && morseStore.smoothing) &&
                    <> 
                    <div className="col-md-auto">
                        <div className="input-group">

                        <SimpleNumberInput height={20} width={20} maxWidth="100px" minWidth="75px" 
                        morseStore={morseStore} pic="graphuparrowImage" min={0} max={10} 
                        text="RiseK" value={morseStore.riseTimeConstant} step={.001}
                        onChange={(e)=>runInAction(()=>morseStore.riseTimeConstant=e.target.value)} />

                        </div>
                    </div>
                    
                    <div className="col-md-auto">
                        <div className="input-group">

                        <SimpleNumberInput height={20} width={20} maxWidth="100px" minWidth="75px" 
                        morseStore={morseStore} pic="graphdownarrowImage" min={0} max={10} 
                        text="DecayK" value={morseStore.decayTimeConstant} step={.001}
                        onChange={(e)=>runInAction(()=>morseStore.decayTimeConstant=e.target.value)} />

                        </div>
                    </div>
                    
                    <div className="col-md-auto">
                        <div className="input-group">

                        <SimpleNumberInput height={20} width={20} maxWidth="75px" minWidth="75px" 
                        morseStore={morseStore} pic="stopwatchImage" min={.1} max={5} 
                        text="Pitch" value={morseStore.decayMsOffset} step={.1}
                        onChange={(e)=>runInAction(()=>morseStore.decayMsOffset=e.target.value)} />


                        </div>
                    </div>
                    </>
                    }
                </div>
            </div>

        </div>
    </div>
</div>

)})

export default MorseSettingsAccordion