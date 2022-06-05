import { observer } from "mobx-react"
import SimpleMorseImage from "../../image/simpleMorseImage"
import { IMorseStoreProps } from "../../IMorseStoreProps"
import LessonRadioTarget from "./lessonRadioTarget"
import {runInAction} from "mobx"
import LessonButtonTarget from "./lessonButtonTarget"
import LessonsBadge from "./lessonsBadge"
import MorseToggleButton from "./morseToggleButton"
import ToggleMorseImage from "../../image/toggleMorseImage"

const LessonsAccordion = observer(({morseStore}:IMorseStoreProps) => {

    const onUserTargetClick = (userType:any) => {
        runInAction(()=>{
            console.log(`${userType} was clicked`)
            morseStore.lessons.userTarget=userType
        })
    }

    const onClassTargetClick = (classType:any) => {
        runInAction(()=>{
            console.log(`${classType} was clicked`)
            morseStore.lessons.selectedClass=classType
        })
    }

    const onLetterGroupTargetClick = (letterGroupType:any) => {
        runInAction(()=>{
            console.log(`${letterGroupType} was clicked`)
            morseStore.lessons.letterGroup = letterGroupType
        })
    }

    const onDisplayTargetClick = (displayType:any) => {
        runInAction(()=>{
            console.log(`${displayType} was clicked`)
            morseStore.lessons.setDisplaySelected(displayType)
        })
    }

    

    return(
<div className="accordion-item">
    <h2 className="accordion-header" id="headingMockuplessons">
        
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseMockup" aria-expanded="false" aria-controls="collapseMockup"
            id="lessonAccordianButton">
            <SimpleMorseImage pic='bookImage' height={20} width={20} morseStore={morseStore} />
            <span>&nbsp;</span><span>LICW Lessons</span>
            <span>&nbsp;</span>
            <LessonsBadge morseStore={morseStore}/>
        </button>
    </h2>

    <div id="collapseMockup" className="accordion-collapse collapse"
        aria-labelledby="headingMockuplessons" data-bs-parent="#accordionExample">
        <div className="accordion-body">

            <div className="row gy-2 row-cols-6">
                
                <div className="col-auto">
                    <div className="btn-group-vertical" role="group"
                        aria-label="Basic radio toggle button group">
                        {morseStore.lessons.userTargets.map((ut) => 
                        <LessonRadioTarget display={ut} key={ut} checkedDisplay={morseStore.lessons.userTarget} 
                         inputName="btnradioUserTargets" labelName="btnUserTypeSelection" onRadioClick={onUserTargetClick} />
                        )}                        
                    </div>
                </div>
                
                <div className="col-auto">
                    <div className="btn-group-vertical" role="group"
                        aria-label="Basic radio toggle button group">
                        {morseStore.lessons.classes.map((ut) => 
                        <LessonRadioTarget display={ut} key={ut} checkedDisplay={morseStore.lessons.userTarget} 
                         inputName="btnradioClasses" labelName="btnClassSelection" onRadioClick={onClassTargetClick} />
                        )}                        
                    </div>
                </div>
                
                <div className="col-auto">
                    <div className="list-group"
                        data-bind="foreach: lessons.letterGroups, childrenComplete: () => lessons.setLetterGroupInitialized()"
                        style={{overflowY:"auto", height:"250px", width:"200px"}}>
                        {morseStore.lessons.letterGroups.map((ut) => 
                        <LessonButtonTarget display={ut} key={ut} checkedDisplay={morseStore.lessons.letterGroup} 
                         inputName="btnLetterGroupSelection" onClick={()=>onLetterGroupTargetClick(ut)} />
                        )}   
                    </div>
                </div>
                
                <div className="col-auto">
                    <div className="list-group"
                        data-bind="foreach: lessons.displays, childrenComplete: () => lessons.setDisplaysInitialized()"
                        style={{overflowY:"auto", height:"250px", width: "200px"}}>
                        {morseStore.lessons.displays.map((ut) => 
                        <LessonButtonTarget display={ut.display} key={ut.display} checkedDisplay={morseStore.lessons.selectedDisplay.display} 
                         inputName="btnLessonSelection" onClick={()=>onDisplayTargetClick(ut)} />
                        )}  
                    </div>
                </div>

                
                <div className="col-auto">
                    <div className="btn-group-vertical" role="group"
                        aria-label="Basic checkbox toggle button group">
                        <MorseToggleButton btnColoring="btn-outline-primary" label="Randomize" isChecked={morseStore.lessons.randomizeLessons}
                                            onChange={()=>{runInAction(()=>morseStore.lessons.randomizeLessons = !morseStore.lessons.randomizeLessons)}} 
                                            id="btncheck1" toggle={morseStore.lessons.randomizeLessons}  morseStore={morseStore}/>

                        <MorseToggleButton btnColoring="btn-outline-primary" label="Auto Close" isChecked={morseStore.lessons.autoCloseLessonAccordion}
                                            onChange={()=>{runInAction(()=>morseStore.lessons.autoCloseLessonAccordion = !morseStore.lessons.autoCloseLessonAccordion)}} 
                                            id="btncheckautoclose" toggle={morseStore.lessons.autoCloseLessonAccordion}  morseStore={morseStore}/>
                        
                        <MorseToggleButton btnColoring="btn-outline-primary" label="Sticky Sets" isChecked={morseStore.lessons.ifStickySets} style={{width: "125px"}}
                                            onChange={()=>{runInAction(()=>morseStore.lessons.ifStickySets = !morseStore.lessons.ifStickySets)}} 
                                            id="btncheck2stickysetstoggle" toggle={morseStore.lessons.ifStickySets}  morseStore={morseStore}/>
                        
                        <input type="text" className="form-control" style={{maxWidth:"125px"}}
                            aria-label="Username" min="0"
                            disabled={!morseStore.lessons.ifStickySets}
                            data-bind="textInput: lessons.stickySets, enable: lessons.ifStickySets"/>
                    </div>

                    <div className="input-group">
                        <div className="btn-group-vertical" role="group"
                            aria-label="Basic checkbox toggle button group">
                            
                            <button type="button" className="btn btn-success"
                                disabled={!morseStore.lessons.customGroup}
                                onClick={()=>runInAction(()=>morseStore.lessons.doCustomGroup())}
                                style={{maxWidth:"125px", paddingLeft: "2px", paddingRight: "2px"}} 
                            >Custom Group</button>
                            
                            <input type="text" className="form-control" style={{maxWidth:"125px"}}
                                aria-label="Username" min="0"
                                value={morseStore.lessons.customGroup}
                                onChange={(e)=>runInAction(()=>morseStore.lessons.customGroup = e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <MorseToggleButton btnColoring="btn-outline-primary" label="Keep Lines" isChecked={morseStore.newLineChunking} style={{width: "125px", maxWidth:"125px"}}
                                            onChange={()=>{runInAction(()=>morseStore.newLineChunking = !morseStore.newLineChunking)}} 
                                            id="btncheck2newlinechunking" toggle={morseStore.newLineChunking}  morseStore={morseStore}/>
                </div>

                
                <div className="col-auto">
                
                <MorseToggleButton btnColoring="btn-outline-primary" label="Override Time" isChecked={morseStore.lessons.ifOverrideTime}
                                            onChange={()=>{runInAction(()=>morseStore.lessons.ifOverrideTime = !morseStore.lessons.ifOverrideTime)}} 
                                            id="btncheck2" toggle={morseStore.lessons.ifOverrideTime}  morseStore={morseStore}/>

                    <div className="input-group">
                        
                        <span style={{width: "76px"}} className="input-group-text">Mins</span>
                        <input type="number" className="form-control" style={{maxWidth:"70px"}}
                            aria-label="Username" min="0"
                            disabled={!morseStore.lessons.ifOverrideTime}
                            value = {morseStore.lessons.overrideMins}
                            onChange = {(e)=>runInAction(()=>{ morseStore.lessons.overrideMins = parseInt(e.target.value) })}
                            data-bind="textInput: lessons.overrideMins, enable: lessons.ifOverrideTime"/>
                    </div>

                    <div className="btn-group" role="group"
                        aria-label="Basic checkbox toggle button group">
                        
                        <MorseToggleButton btnColoring="btn-outline-primary" label="Override Size" isChecked={morseStore.lessons.ifOverrideMinMax} style={{width: "146px"}}
                                            onChange={()=>{runInAction(()=>morseStore.lessons.ifOverrideMinMax = !morseStore.lessons.ifOverrideMinMax)}} 
                                            id="btncheck2overridesize" toggle={morseStore.lessons.ifOverrideMinMax}  morseStore={morseStore}/>
                        
                    </div>

                    <div className="input-group">
                        
                        <span style={{width: "76px"}} className="input-group-text">Min</span>
                        <input style={{width: "70px"}} type="number" className="form-control"
                            aria-label="Username" min="1"
                            disabled={!morseStore.lessons.ifOverrideMinMax}
                            value={morseStore.lessons.overrideMin}
                            onChange={(e)=>{runInAction(()=>{
                                morseStore.lessons.overrideMin = parseInt(e.target.value)
                                
                                if (morseStore.lessons.syncSize) {
                                    morseStore.lessons.overrideMax = morseStore.lessons.overrideMin
                                }
                            } )}}
                            data-bind="textInput: lessons.overrideMin, enable: lessons.ifOverrideMinMax"/>

                    </div>

                    <div className="input-group">
                    
                        <span className="input-group-text"
                            onClick={(e)=>{runInAction(()=>{morseStore.lessons.syncSize = !morseStore.lessons.syncSize})}}
                            >Max&nbsp;
                            <ToggleMorseImage truePic="lockImage" falsePic="unlockImage" toggle={morseStore.lessons.syncSize} morseStore={morseStore} />
                        </span>
                        <input type="number" className="form-control" style={{maxWidth:"70px"}}
                            aria-label="Username" 
                            disabled={!(morseStore.lessons.ifOverrideMinMax && !morseStore.lessons.syncSize)}
                            min = {morseStore.lessons.overrideMin}
                            value = {morseStore.lessons.overrideMax}
                            onChange = {(e)=>runInAction(()=>morseStore.lessons.overrideMax = parseInt(e.target.value))}
                        />
                    </div>
                    
                    <button type="button" className="btn btn-success"
                        disabled={!(morseStore.lessons.selectedDisplay.display && !morseStore.lessons.selectedDisplay.isDummy)}
                        onClick={()=>runInAction(()=>morseStore.lessons.setDisplaySelected(morseStore.lessons.selectedDisplay))}
                        style={{width: "146px", paddingLeft:"2px", paddingRight: "2px"}}>Regenerate Drill
                    </button>
                </div>
            </div>

    </div>
</div>
</div>

)
})

export default LessonsAccordion