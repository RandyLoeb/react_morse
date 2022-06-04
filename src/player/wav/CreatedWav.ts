import { ITimeLineInfo } from '../../timing/TimeLineInfo'
import { UnitTimingsAndMultipliers } from '../../timing/UnitTimingsAndMultipliers'

export class CreatedWav {
  sample:number[]=[]
  wav:number[]=[]
  timeLine:ITimeLineInfo[]=[]
  timingUnits!:UnitTimingsAndMultipliers
}
