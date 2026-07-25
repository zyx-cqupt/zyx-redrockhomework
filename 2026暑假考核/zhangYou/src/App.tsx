import './App.scss'
import { useState } from 'react'
import { ScheduleBody } from '@/components/scheduleBody'
import { getCurrentWeek } from '@/utils/day'
import { AddEvent } from '@/components/addEvent'
import type { addInfoType } from '@/types/addEvent'
function App() {

  //当前周
  const currentWeek = getCurrentWeek()
  const [week, setWeek] = useState<number>(currentWeek)


  //上一周
  const preWeek = () => {
    if (week > 1) {
      setWeek(week - 1)
    }
    else {
      setWeek(currentWeek)
    }
    triggerRotate()

  }
  //下一周
  const nextWeek = () => {
    if (week < 24) {
      setWeek(week + 1)
    }
    else {
      setWeek(1)
    }
    triggerRotate()
  }
  //回到本周
  const backToCurrentWeek = () => {
    setWeek(currentWeek)
    triggerRotate()
  }

  //控制周次转动
  const [rotate, setRotate] = useState<boolean>(false)
  const triggerRotate = () => {
    setRotate(true)
    const timetr = setTimeout(() => {
      setRotate(false)
    }, 600)
    return () => {
      clearTimeout(timetr)
    }

  }

  //周数字转换为中文
  const weekToCn = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四']

  //控制自定义事件显隐

  const [eventVisible, setEventVisible] = useState<boolean>(false)

  //获取addEvent数据
  const [addInfoData, setAddInfoData] = useState<addInfoType>(
    {
      title: '',
      content: '',
      week: 1,
      startTime: 1,
      endTime: 1,
      selectedWeeks: [],
    }
  )
  const onConfirm = (addInfo: addInfoType) => {
    //console.log(addInfo);
    setAddInfoData(addInfo)


  }

  //编辑按钮点击事件

  const [editData, setEditData] = useState<addInfoType>({
    title: '',
    content: '',
    week: 1,
    startTime: 1,
    endTime: 1,
    selectedWeeks: [],
  })


  const onEdit = (data: addInfoType) => {
    // console.log(data);
    setEditData(data)


  }


  return (
    <>
      {/* 顶部导航栏 */}
      <div className="header">
        <div className='left'>
          <h3 className={rotate ? 'monthAni' : ''}>第{weekToCn[week - 1]}周 </h3>
          <span>{'>'} </span>
        </div>
        <div className="center">
          <div className="last"
            onClick={preWeek}
          >上一周</div>
          <div className="next"
            onClick={nextWeek}
          >下一周</div>
        </div>
        <div className='right'>
          <div className='button'
            onClick={backToCurrentWeek}
          >回到本周</div>
        </div>
      </div>

      {/* 课表容器 */}
      <div className="scheduleBox">
        <ScheduleBody
          weekNum={week}
          eventVisible={eventVisible}
          onEventClick={() => setEventVisible(true)}
          addInfoData={addInfoData}
          setEventVisible={setEventVisible}
          onEdit={onEdit}




        />

      </div>
      {/* 新增事件弹窗 */}
      <AddEvent
        week={week}
        visible={eventVisible}
        onCancel={() => {
          setEventVisible(false)
          setEditData({
            title: '',
            content: '',
            week: 1,
            startTime: 1,
            endTime: 1,
            selectedWeeks: [],
          })
        }}
        onConfirm={onConfirm}
        editData={editData}
        onDelete={() => {
          setAddInfoData({
            title: '',
            content: '',
            week: 1,
            startTime: 1,
            endTime: 1,
            selectedWeeks: [],
          })
          setEditData({
            title: '',
            content: '',
            week: 1,
            startTime: 1,
            endTime: 1,
            selectedWeeks: [],
          })
          setEventVisible(false)
        }}
      />


    </>
  )

}

export default App