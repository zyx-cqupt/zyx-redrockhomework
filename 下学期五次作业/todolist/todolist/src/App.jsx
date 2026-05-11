import './App.css'
import { useState, useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'

function Item({ item, handleClick,handleToggle }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange = {() =>handleToggle(item.id)}

      />
      <div className="task-content">
        {item.content}
      </div>
      <span className="task-delete"
        onClick={() => handleClick(item.id)}
      >删除</span>
    </li>
  )
}
function App() {
  // 1.使用useState维护list
  const todolist = [{
    id: uuidV4(),
    content: '学习React',
    isDone: false,
  }]
  const [list, setList] = useState(todolist)
  //添加任务
  const submitRef = useRef(null)
  const [value, setValue] = useState('')
  const handleSubmit = () => {
    if (value !== '') {
      setList([
        ...list,
        {
          id: uuidV4(),
          content: value,
          isDone: false,
        }
      ])
      setValue('')
      submitRef.current.focus()
    }

  }

  //删除任务功能
  const handleClick = (id) => {
    setList(list.filter(item => item.id !== id))
  }
  //全选功能
  const allSelectRef = useRef(null)
  const handleSelectAll = () => {
    if(allSelectRef.current.checked){
    setList(list.map(val => { return{...val,isDone:true}}))
  }
  else{
    setList(list.map(val => { return{...val,isDone:false}}))
  }
}
const isAllDone = list.every(item => item.isDone === true)


//切换任务状态
const handleToggle = (id) => {
setList(list.map(val => {
  if(val.id === id){
    return{...val,isDone:!val.isDone}
  }
  else{
    return val
  }
}))
}
  
  return (
    <>
      <h1 className='title'>Todolist任务清单</h1>
      <div className="container">
        <div className="top">
          <input
            type="text"
            className='input'
            value={value}
            ref={submitRef}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className='add'
            onClick={handleSubmit}

          >
            添加任务
          </button>
        </div>
        {/* 任务列表 */}
        <ul className="task-list">
          {list.map((item) => <Item
            item={item}
            key={item.id}
            handleClick={handleClick}
            handleToggle={handleToggle}
          ></Item>)}
        </ul>
        {/* 底部操作 */}
        <footer>
          <input type="checkbox"
           onClick={handleSelectAll}
           ref = {allSelectRef}
              checked = {isAllDone? true : false} />
        
          <span
          >全选</span>
         
        </footer>


      </div>

    </>
  )
}

export default App