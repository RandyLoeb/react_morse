import { observer } from "mobx-react"
import { IMorseStoreProps } from "../../IMorseStoreProps"

const LessonsBadge = observer(({morseStore}:IMorseStoreProps) => {

    

    let badge;
    if (!morseStore.lessons.selectedDisplay.display) {
        badge = <span className="badge bg-success" data-bind="if: !lessons.selectedDisplay().display">(None
            Currently
            Selected)</span>
    } else {
        badge = <span className="badge bg-success" data-bind="if: lessons.selectedDisplay().display">
        <span>Type: </span><span data-bind="text: lessons.userTarget">{morseStore.lessons.userTarget}</span>
        <span>&nbsp; Class: </span><span data-bind="text: lessons.selectedClass">{morseStore.lessons.selectedClass}</span>
        <span>&nbsp; Letter Group: </span><span
            data-bind="text: lessons.letterGroup">{morseStore.lessons.letterGroup}</span>
        <span>&nbsp; Lesson: </span><span
            data-bind="text: lessons.selectedDisplay().display">{morseStore.lessons.selectedDisplay.display}</span>
    </span>
    }

    return(<>{badge}</>)
})

export default LessonsBadge