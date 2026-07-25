import Mock from 'mockjs'
import { v4 as uuidv4 } from 'uuid'
const Random = Mock.Random
//课程信息
const courseInfo = [
  { className: '高等数学A(下)', teacher: '沈世云', classRoom: '3206', backgroundColor: '#f9e8d7', fontColor: '#ed852c' },
  { className: '线性代数', teacher: '何五一', classRoom: '2215', backgroundColor: '#dde3f9', fontColor: '#6280ec' },
  { className: '大学物理C(上)', teacher: '赖昌', classRoom: '2101', backgroundColor: '#eac5ac', fontColor: '#ca6a2a' },
  { className: '中国近现代史', teacher: '李云宵', classRoom: '3304', backgroundColor: '#f9e8d7', fontColor: '#ed852c' },
  { className: '大学体育', teacher: '熊雪', classRoom: '风雨操场', backgroundColor: '#8cd3a1', fontColor: '#3db561' },
  { className: '通用学术英语', teacher: '丁义', classRoom: '9302', backgroundColor: '#8cd3a1', fontColor: '#3db561' },
  { className: '大学生心理健康', teacher: '肖子伦', classRoom: '3108', backgroundColor: '#f9e8d7', fontColor: '#ed852c' },
  { className: '现代生命科学导论', teacher: '侯郑军', classRoom: '2402', backgroundColor: '#dde3f9', fontColor: '#a1b5fb' }
]


//课程模板
const courseTemplate = {
  id: () => uuidv4(),
  courseInfo: () => Random.pick(courseInfo),
  weekday: () => Random.pick([1, 2, 3, 4, 5]),
  weekRule: () => Random.pick([0, 1, 2]),
  startSection: () => Random.pick([1, 3, 5, 7, 9]),
  endSection: function () {
    return this.startSection + Random.pick([1, 2])
  },
  isCustom: false
}

//周课程模板
const weekCourseList = () => {
  const wholeWeek = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17]
  const weekCourse = wholeWeek.map(item => ({
    weekNum: item,
    courseList: item <= 17 ? generateCourseList() : []
  }))
  return weekCourse
}



//生成课程数据
const generateCourseList = () => {
  const mockData = Mock.mock({
    'list|10':[courseTemplate]
  })
  return mockData.list
}

Mock.mock('/api/courseList', 'get', () => {
  return {
    code: 200,
    msg: 'success',
    data: weekCourseList()
  }
})