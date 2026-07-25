 export interface ClassBlockInterface {
  id:string,
  courseInfo:{
    className:string,
    teacher:string,
   classRoom:string,
   backgroundColor:string,
   fontColor:string,
  },
  weekday:number,
  startSection:number,
  endSection:number,
  weekRule:number,
  isCustom:boolean
}
export interface WeekCourseInterface {
  weekNum:number,
  courseList:ClassBlockInterface[]
}