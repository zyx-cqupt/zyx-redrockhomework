import { useState, useEffect } from 'react'
import axios from 'axios'
import { ClassBlock } from '@/components/classBlock'
import { CourseDetail } from '@/components/courseDetail'
import type { ClassBlockInterface } from '@/types/classBlock'
import './index.scss'
import { getWeekInfo } from '@/utils/day'
import noClassImg from '@/images/无课界面.png'
import type { addInfoType } from '@/types/addEvent'

interface propsInterface {
  weekNum: number,
  eventVisible: boolean,
  onEventClick: () => void,
  addInfoData: addInfoType,
  setEventVisible: (visible: boolean) => void,
  onEdit: (data: addInfoType) => void,



}
export const ScheduleBody = (props: propsInterface) => {


  const { weekNum, onEventClick, addInfoData, setEventVisible, eventVisible, onEdit } = props



  //获取课程数据

  const [classList, setClassList] = useState<ClassBlockInterface[]>([])

  useEffect(() => {
    const getClassData = async () => {
      try {
        const res = await axios.get('/api/courseList')
        //console.log(res);

        const weekClassList = res.data.data[weekNum - 1].courseList
        if (weekClassList) {
          setClassList(weekClassList)
        } else {

          setClassList([])

        }

      } catch (error) {
        console.error('获取课程数据失败:', error)
        setClassList([])
      }

    }
    getClassData()

  }, [weekNum])


  //按日筛选课程
  const filterClassListByDay = (classList: ClassBlockInterface[], conditionDay: number) => {
    return classList.filter((item) => {
      return item.weekday === conditionDay
    })
  }


  //获取具体日期
  const days = getWeekInfo(weekNum)


  //点击课程
  const [classBlockData, setClassBlockData] = useState<ClassBlockInterface | null>(null)

  //控制课程详情显隐
  const [detailVisible, setDetailVisible] = useState<boolean>(false)


  const onClassClick = (item: ClassBlockInterface) => {
    //得到课程卡片返回的数据
    //console.log(item)
    setClassBlockData(item)
    setDetailVisible(true)
  }

  //点击课程列表
  const onClassListClick = () => {
    setDetailVisible(false)
    if (!detailVisible) {
      onEventClick()
    }
  }

  //添加事件渲染

  const addEventDataToBlock: ClassBlockInterface = {
    id: '',
    courseInfo: {
      className: addInfoData.title,
      teacher: '自定义',
      classRoom: addInfoData.content,
      backgroundColor: '#4a44e4',
      fontColor: '#fff',
    },
    weekday: Number(addInfoData.week),
    startSection: addInfoData.startTime,
    endSection: addInfoData.endTime,
    weekRule: 0,
    isCustom: true
  }





  return (
    <>
      <div className="scrollBox">
        <div className="scheduleList"

        >
          <div className="month">{days[0].month}月</div>
          <ul>
            <li><div>周一</div><span>{days[0].day}日</span></li>
            <li><div>周二</div><span>{days[1].day}日</span></li>
            <li><div>周三</div><span>{days[2].day}日</span></li>
            <li><div>周四</div><span>{days[3].day}日</span></li>
            <li><div>周五</div><span>{days[4].day}日</span></li>
            <li><div>周六</div><span>{days[5].day}日</span></li>
            <li><div>周日</div><span>{days[6].day}日</span></li>
          </ul>
        </div>
        <div className="schedule">
          <div >
            <ul className="classMount">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
              <li>12</li>
            </ul>
            <div className="classList"
              onClick={onClassListClick}
              style={{
                background: `${weekNum >= 17 ? `url(${noClassImg}) no-repeat center center` : ''} `,
              }}
            >
              {classList.length > 0 && [1, 2, 3, 4, 5].map(val => {
                return filterClassListByDay(classList, val).map((item) => {
                  return <ClassBlock {...item} key={item.id}

                    onClick={() => onClassClick(item)}
                  />
                })
              })}
              {addInfoData.selectedWeeks.includes(weekNum) &&
                <ClassBlock
                  {...addEventDataToBlock}
                  key={addEventDataToBlock.id}
                  onClick={() => onClassClick(addEventDataToBlock)}

                />
              }
            </div>
          </div>
        </div>
        {/* 课表详情弹窗 */}
        <CourseDetail
          data={classBlockData}
          detailVisible={detailVisible}
          setDetailVisible={setDetailVisible}
          eventVisible={eventVisible}
          setEventVisible={setEventVisible}
          onEdit={onEdit}

        />

      </div>

    </>

  )
}