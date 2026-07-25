import './index.scss'
import type { ClassBlockInterface } from '@/types/classBlock'
import type { addInfoType } from '@/types/addEvent'

interface Props {
  data: ClassBlockInterface | null
  detailVisible: boolean
  setDetailVisible: (visible: boolean) => void
  eventVisible: boolean
  setEventVisible: (visible: boolean) => void
  onEdit: (data: addInfoType) => void
}

export const CourseDetail = (props: Props) => {

  if (!props.data) return
  const { courseInfo, endSection, startSection, weekday, isCustom } = props.data
  const { detailVisible, setDetailVisible, setEventVisible, onEdit } = props
 




  //星期转换
  const weekToCn = [
    '一', '二', '三', '四', '五'
  ]
  //节数对应时间

  type ClassTime = {
    start: string
    end: string
  }
  const classTime: Record<number, ClassTime> = {
    1: { start: '08:00', end: '08:45' },
    2: { start: '08:55', end: '09:40' },
    3: { start: '10:15', end: '11:00' },
    4: { start: '11:10', end: '11:55' },
    5: { start: '14:00', end: '14:45' },
    6: { start: '14:55', end: '15:40' },
    7: { start: '16:15', end: '17:00' },
    8: { start: '17:10', end: '17:55' },
    9: { start: '19:00', end: '19:45' },
    10: { start: '19:55', end: '20:40' },
    11: { start: '20:50', end: '21:35' },
    12: { start: '21:45', end: '22:30' },
  }

  //编辑按钮点击事件
  const onEditButtonClick = () => {
    setDetailVisible(false)
    setTimeout(() => {
      setEventVisible(true)
    }, 300)
    onEdit({
      title: courseInfo.className,
      content: courseInfo.classRoom,
      week: weekday,
      startTime: startSection ,
      endTime: endSection ,
      selectedWeeks: [],



    })




  }

  return (
    <>
      <div className='detailBox'
        style={{
          transform: detailVisible ? 'translateY(0)' : 'translateY(100%)'
        }}

      >
        <header className="courseName">
          <h3 >{courseInfo.className}</h3>
          {isCustom &&
            <button
              className='edit'
              onClick={onEditButtonClick}
            >编辑
            </button>}
        </header>
        <div className="stuInfo">
          <span>詹永轩</span>
          <span>2025212697</span>
        </div>
        <div className="classTeacherInfo">
          <span>{courseInfo.classRoom}</span>
          <span>{courseInfo.teacher}</span>
        </div>
        <div className="zhouqi">
          <div>周期</div>
          <div>
            <span>1-16周</span>
            <span>{(endSection + 1) - startSection}节连上</span>
          </div>
        </div>
        <div className="classTime">
          <div>时间</div>
          <div>星期{weekToCn[weekday - 1]} {`${classTime[startSection].start}-${classTime[endSection].end}`}</div>
        </div>
        <div className="classType">
          <div>类型</div>
          <div>{isCustom ? '事务' : '必修'}</div>
        </div>
      </div>
    </>
  )
}