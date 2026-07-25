import { useState, useRef,  useCallback } from 'react'
import './index.scss'

 export type selected  = {
    week: number,
    startTime: number,
    endTime: number,
  }

type timePickerProps = {
  onChange: (selected: selected) => void,
}
export const TimePicker = (props: timePickerProps) => {
  const {onChange} = props

   //存储选中的值

 
  const [selected, setSelected] = useState<selected>({
    week: 1,
    startTime: 1,
    endTime: 1,
  })


  const weeks = ['一', '二', '三', '四', '五', '六', '天']
  const startTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //const endTimes = startTimes


  //获取元素
  const weekRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  
 
  //获得选中的值的索引
  const getSelectedIndex = (ele: HTMLDivElement|null): number =>  {
    if(!ele) return 0
   
    
    return Math.floor(ele.scrollTop/50)

  }
  //滚动事件
  const handleScroll = useCallback(() => {
    
    const weekIndex = getSelectedIndex(weekRef.current)
    const startTimeIndex = getSelectedIndex(startRef.current)
    const endTimeIndex = getSelectedIndex(endRef.current)

    const newSelected = {
      week: weekIndex+1,
      startTime: startTimes[startTimeIndex],
      endTime: startTimes[startTimeIndex] + endTimeIndex
    }
    setSelected(newSelected)
     onChange(newSelected)
  }, [weekRef, startRef, endRef])
 


//防抖函数
const debounce = (fn: () => void, delay: number) => {
  let timer:number|null = null
  return () => {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
//防抖滚动事件
 const debouncedScroll = useRef(debounce(handleScroll, 300))

  return (
    <div className="timePicker">
      <div className="topMark"></div>
      <div className="mediumMark"></div>
      <div className="bottomMark"></div>
      <div className="weekColumn" ref={weekRef}
        onScroll={() => debouncedScroll.current()}
      >
        <div className="top"></div>
        {
          weeks.map(val => {
            return (
              <div className="weekItem" key={val}>星期{val}</div>
            )
          })
        }
        <div className="bottom"></div>

      </div>



      <div className="satrtColumn" ref={startRef}
        onScroll={() => debouncedScroll.current()}
      >
        <div className="top"></div>
        {
          startTimes.map(val => {
            return (
              <div className="startTimeItem" key={val}>从第{val}节</div>
            )
          })
        }
        <div className="bottom"></div>



      </div>
      <div className="endColumn" ref={endRef}
        onScroll={() => debouncedScroll.current()}
      >
        <div className="top"></div>
        {startTimes.filter((val) => val >= (selected.startTime)).map(val => {
          return (
            <div className="endTimeItem" key={val}>到第{val}节</div>
          )
        })}
        <div className="bottom"></div>

      </div>
    </div>
  )
}