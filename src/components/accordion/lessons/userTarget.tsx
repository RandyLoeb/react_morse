import { observer } from "mobx-react"
import { IMorseStoreProps } from "../../IMorseStoreProps"

const UserTarget = observer(({morseStore}:IMorseStoreProps) => {
    return(
        <>
<input type="radio" className="btn-check" name="btnradioUserTargets"
data-bind="checkedValue: $data, checked: $root.lessons.userTarget"/>
<label id="btnUserTypeSelection" className="btn btn-outline-primary"
data-bind="text: $data, click: $root.lessons.changeUserTarget($data)"></label>
    </>
)})

export default UserTarget