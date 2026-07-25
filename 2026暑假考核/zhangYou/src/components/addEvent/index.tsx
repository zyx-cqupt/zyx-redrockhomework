import './index.scss'
import { TimePicker } from './timePicker/index'
import { useEffect, useState } from 'react'
import type { selected } from './timePicker/index'
import type { addInfoType } from '@/types/addEvent'

interface Props {
  week: number,
  visible: boolean,
  onCancel: () => void,
  onConfirm: (addInfo: addInfoType) => void,
  editData: addInfoType,
  onDelete: () => void,
}

export const AddEvent = (props: Props) => {

  const { week, visible, onCancel, onConfirm, onDelete } = props

  const weeks = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一',
    '二十二', '二十三', '二十四'
  ]

  //表单数据
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([week - 1])


  //监听props.week，外部传入的值变化时，同步修改内部选中周

  useEffect(() => {
    setSelectedWeeks([week - 1])

  }, [week])


  //点击周次

  const handleClickWeek = (index: number) => {
    setSelectedWeeks(prev => {
      if (prev.includes(index)) {
        return prev.filter(item => item !== index)
      } else {
        return ([...prev, index]).sort((a, b) => a - b)//从小到大排序
      }
    })
  }


  //timePicker 返回数据


  const [selectedData, setSelectedData] = useState<selected>({
    week: 1,
    startTime: 1,
    endTime: 1,
  })

  const onSelectedChange = (selected: selected) => {

    setSelectedData(selected)


  }


  //提交表单


  const [confirm, setConfirm] = useState<boolean>(false)


  const [addInfo, setAddInfo] = useState<addInfoType>({
    title: '',
    content: '',
    selectedWeeks: [],
    week: 1,
    startTime: 1,
    endTime: 1,
  })

  useEffect(() => {
    if (title && content && selectedWeeks.length > 0) {
      setConfirm(true)
    }else{
      setConfirm(false)
    }

  }, [title, content, selectedWeeks])

  const onSubmit = () => {
    if (!title || !content || selectedWeeks.length === 0) {
      return alert('请填写完整信息')
    }

   // 先构建新数据
  const newInfo = {
    ...addInfo,
    title: title,
    content: content,
    selectedWeeks: selectedWeeks.map(val => val + 1),
    week: selectedData.week,
    startTime: selectedData.startTime,
    endTime: selectedData.endTime,
  }

  setAddInfo(newInfo)
  onConfirm(newInfo) // 把新构造的对象传给父组件，避免传原始对象

    setTitle('')
    setContent('')
    setSelectedWeeks([])
    onCancel()


  }
  //表单回填
 useEffect(() => {
    if(!visible) return
    setTitle(props.editData.title)
    setContent(props.editData.content)
   }, [props.editData, visible])

  //删除事件
  const handleDelete = () => {
    setTitle('')
    setContent('')
    onDelete()
   
  }



  return (
    <>
      <div className="addEventBox"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <header>
          <h3
          >为你的行程添加一个标题</h3>
          <div>
            <span className="delete"
            onClick={() => {
              handleDelete()
              
            }}

            >删除</span>
          <span onClick={() => {
            onCancel()
            setTitle('')
            setContent('')



          }}>取消</span>

          </div>
          
        </header>
        <form>
          <input className="eventTitle" type="text" placeholder="例如:自习"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
        <h3 className="eventContent">具体内容</h3>
        <form >
          <input className="eventContentInput" type="text" placeholder="例如:红岩网校工作站"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
        <h3 className="eventWeek">选择周次</h3>

        <div className="weekBox">
          {weeks.map((val, index) => {
            const isActive = selectedWeeks.includes(index)
            return (
              <div className="weekItem" key={index}
                onClick={
                  () => {
                    handleClickWeek(index)
                  }
                }
                style={{
                  backgroundColor: isActive ? '#4a44e4' : '#f2f3f7',
                  color: isActive ? '#fff' : '#495e7f',
                }}

              >第{val}周</div>
            )
          })}
        </div>
        <h3 className="confirmTime">确定时间</h3>

        <TimePicker
          onChange={onSelectedChange}
        />

        <div className="next"
          onClick={() => { onSubmit()}}
          style={{
            backgroundColor: confirm ? '#4a44e4' : '#aabbff',
          }}
        >
          确定
        </div>



      </div>
    </>
  )
}
