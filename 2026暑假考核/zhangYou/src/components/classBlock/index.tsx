import type { ClassBlockInterface } from '@/types/classBlock'
import './index.scss'


interface Props extends ClassBlockInterface{
  onClick:(item:ClassBlockInterface) => void
}
export const ClassBlock = (props: Props) => {
  const { courseInfo, endSection, startSection,weekRule,weekday, onClick,id,isCustom } = props
  const item = {
    courseInfo,
    endSection,
    startSection,
    weekday,
    id,
    isCustom,
    weekRule

  }


  return (
    <div className="classItem"
      style={{
        gridRow: `${startSection}/${endSection+1}`,
        gridColumn: `${weekday}/${weekday+1}`,
        background: courseInfo.backgroundColor,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick(item)
      }}

     
    >
      <div className="className"
        style={{
          color: courseInfo.fontColor,
        }}
      >{courseInfo?.className}</div>
      <div className="classAddress"
        style={{
          color: courseInfo.fontColor,
        }}
      >{courseInfo?.classRoom}</div>
    </div>
  )
}