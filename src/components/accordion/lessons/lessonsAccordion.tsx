import { observer } from "mobx-react"
import SimpleMorseImage from "../../image/simpleMorseImage"
import { IMorseStoreProps } from "../../IMorseStoreProps"
import LessonRadioTarget from "./lessonRadioTarget"
import {runInAction} from "mobx"
import LessonButtonTarget from "./lessonButtonTarget"

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
            <span className="badge bg-success" data-bind="if: lessons.selectedDisplay().display">
                <span>Type: </span><span data-bind="text: lessons.userTarget"></span>
                <span>&nbsp; Class: </span><span data-bind="text: lessons.selectedClass"></span>
                <span>&nbsp; Letter Group: </span><span
                    data-bind="text: lessons.letterGroup"></span>
                <span>&nbsp; Lesson: </span><span
                    data-bind="text: lessons.selectedDisplay().display"></span>
            </span>
            <span className="badge bg-success" data-bind="if: !lessons.selectedDisplay().display">(None
                Currently
                Selected)</span>
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
                        
                        <input type="checkbox" className="btn-check" autoComplete="off" id="btncheck1"
                            data-bind="checked: lessons.randomizeLessons"/>
                        <label className="btn btn-outline-primary" htmlFor="btncheck1">Randomize&nbsp;<img alt="abc"
                                data-bind="attr:{ src: lessons.randomizeLessons() ? morseLoadImages().getSrc('checkImage') : morseLoadImages().getSrc('circleImage')}" /></label>
                        
                        <input type="checkbox" className="btn-check" autoComplete="off"
                            id="btncheckautoclose"
                            data-bind="checked: lessons.autoCloseLessonAccordion"/>
                        <label className="btn btn-outline-primary" htmlFor="btncheckautoclose">Auto
                            Close&nbsp;<img alt="abc"
                                data-bind="attr:{ src: lessons.autoCloseLessonAccordion() ? morseLoadImages().getSrc('checkImage') : morseLoadImages().getSrc('circleImage')}" /></label>
                    
                        <input type="checkbox" className="btn-check" id="btncheck2stickysetstoggle"
                            autoComplete="off" data-bind="checked: lessons.ifStickySets"/>
                        <label className="btn btn-outline-primary" htmlFor="btncheck2stickysetstoggle"
                            style={{width: "125px"}}>Sticky
                            Sets&nbsp;<img alt="abc"
                                data-bind="attr:{ src: lessons.ifStickySets() ? morseLoadImages().getSrc('checkImage') : morseLoadImages().getSrc('circleImage')}" /></label>
                        
                        <input type="text" className="form-control" style={{maxWidth:"125px"}}
                            aria-label="Username" min="0"
                            data-bind="textInput: lessons.stickySets, enable: lessons.ifStickySets"/>
                    </div>

                    <div className="input-group">
                        <div className="btn-group-vertical" role="group"
                            aria-label="Basic checkbox toggle button group">
                            
                            <button type="button" className="btn btn-success"
                                data-bind="click: lessons.doCustomGroup"
                                style={{maxWidth:"125px", paddingLeft: "2px", paddingRight: "2px"}} 
                            >Custom
                                Group
                            </button>
                            
                            <input type="text" className="form-control" style={{maxWidth:"125px"}}
                                aria-label="Username" min="0"
                                data-bind="textInput: lessons.customGroup"/>
                        </div>
                    </div>
                    
                    <input type="checkbox" className="btn-check" autoComplete="off"
                        id="btnchecknewlinechunking"
                        data-bind="checked: settings.misc.newlineChunking"/>
                    <label className="btn btn-outline-primary" htmlFor="btnchecknewlinechunking"
                        style={{width: "125px", maxWidth:"125px"}}><span>Keep
                            Lines&nbsp;<img alt="abc"
                                data-bind="attr:{ src: settings.misc.newlineChunking() ? morseLoadImages().getSrc('checkImage') : morseLoadImages().getSrc('circleImage')}" /></span></label>

                </div>

                
                <div className="col-auto">
                
                    <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"
                        data-bind="checked: lessons.ifOverrideTime"/>
                    <label className="btn btn-outline-primary" htmlFor="btncheck2">Override
                        Time&nbsp;<img alt="abc"
                            data-bind="attr:{ src: lessons.ifOverrideTime() ? morseLoadImages().getSrc('checkImage') : morseLoadImages().getSrc('circleImage')}" /></label>

                    <div className="input-group">
                        
                        <span style={{width: "76px"}} className="input-group-text">Mins</span>
                        <input type="number" className="form-control" style={{maxWidth:"70px"}}
                            aria-label="Username" min="0"
                            data-bind="textInput: lessons.overrideMins, enable: lessons.ifOverrideTime"/>
                    </div>

                    <div className="btn-group" role="group"
                        aria-label="Basic checkbox toggle button group">
                        
                        <input type="checkbox" className="btn-check" id="btncheck2overridesize"
                            autoComplete="off" data-bind="checked: lessons.ifOverrideMinMax"/>
                        <label style={{width: "146px"}} className="btn btn-outline-primary"
                            htmlFor="btncheck2overridesize">Override
                            Size&nbsp;<img alt="abc"
                                data-bind="attr:{ src: lessons.ifOverrideMinMax() ? morseLoadImages().getSrc('checkImage') : morseLoadImages().getSrc('circleImage')}" /></label>

                    </div>

                    <div className="input-group">
                        
                        <span style={{width: "76px"}} className="input-group-text">Min</span>
                        <input style={{width: "70px"}} type="number" className="form-control"
                            aria-label="Username" min="1"
                            data-bind="textInput: lessons.overrideMin, enable: lessons.ifOverrideMinMax"/>

                    </div>

                    <div className="input-group">
                    
                        <span className="input-group-text"
                            data-bind="click: ()=>lessons.syncSize(!lessons.syncSize())">Max&nbsp;<img alt="abc"
                                data-bind="attr:{ src: lessons.syncSize() ? morseLoadImages().getSrc('lockImage') : morseLoadImages().getSrc('unlockImage')}" /></span>
                        <input type="number" className="form-control" style={{maxWidth:"70px"}}
                            aria-label="Username" min="1"
                            data-bind="textInput: lessons.overrideMax, enable: lessons.ifOverrideMinMax() && !lessons.syncSize(), attr: { min: lessons.trueOverrideMin}"/>
                    </div>
                    
                    <button type="button" className="btn btn-success"
                        data-bind="click: ()=> lessons.setDisplaySelected(lessons.selectedDisplay()), enable: lessons.selectedDisplay().display && !lessons.selectedDisplay().isDummy"
                        style={{width: "146px", paddingLeft:"2px", paddingRight: "2px"}}>Regenerate
                        Drill</button>
                </div>
            </div>

    </div>
</div>
</div>

)
})

export default LessonsAccordion