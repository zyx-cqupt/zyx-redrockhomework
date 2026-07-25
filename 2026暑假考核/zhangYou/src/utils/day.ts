import  dayjs  from 'dayjs'


//第一周周一



const firstWeekMonday = dayjs('2026-03-02')


//今天


const today = dayjs()

//获取当前周
export const getCurrentWeek = () => {
  //相隔天数
  const diffDay = today.diff(firstWeekMonday, 'day')
  //当前周
  const currentWeek = Math.ceil((diffDay + 1) / 7)//向上取整
  return currentWeek
}

//根据周数获得具体信息

export type weekDay = {
  year:number,
  month:number,
  day:number,
}
export const getWeekInfo = (weeekNum:number) => {
  //当前周一
  const currentMonday = firstWeekMonday.add(weeekNum - 1, 'week')

  const days:weekDay[] = []

  for(let i = 0;i<7;i++){
    const day = currentMonday.add(i,'day')
    days.push({
      year:day.year(),
      month:day.month() + 1,
      day:day.date(),
    })
}
  return days
}