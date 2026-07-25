# 掌上重邮课表 - Web 版

仿照掌上重邮 App 的课表功能，实现了一个 Web 端的课程表应用，支持移动端适配。

## 📱 功能特性

### 基础功能
- ✅ 课程表周视图展示
- ✅ 当前周数显示
- ✅ 上一周 / 下一周切换
- ✅ 回到本周按钮
- ✅ 课程详情弹窗（点击课程查看详情）
- ✅ 自定义事件添加（标题、内容、周次、时间）
- ✅ 自定义事件编辑与删除
- ✅ 移动端适配（浏览器 F12 可切换设备模式）

### 进阶功能
- ✅ 课程表出场动画
- ✅ 时间选择器（滚轮式，仿 iOS UIPickerView）
- ✅ 周次多选（支持选择多个周次添加事件）
- ✅ 表单回填（编辑时自动填充原有数据）
- ✅ 时间冲突检测（结束时间不小于开始时间）

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.2.7 | UI 框架 |
| TypeScript | 6.0.2 | 类型安全 |
| Vite | 8.1.1 | 构建工具 |
| SCSS | 1.101.0 | 样式预处理 |
| Day.js | 1.11.21 | 日期处理 |
| Axios | 1.18.1 | HTTP 请求 |
| Mock.js | 1.1.0 | 模拟数据 |

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── addEvent/        # 添加/编辑事件组件
│   │   ├── timePicker/  # 时间选择器组件
│   │   ├── index.tsx    # 事件表单组件
│   │   └── index.scss   # 事件表单样式
│   ├── classBlock/      # 课程卡片组件
│   ├── courseDetail/    # 课程详情弹窗组件
│   └── scheduleBody/    # 课表主体组件
├── types/               # 类型定义
│   ├── addEvent.ts      # 事件数据类型
│   └── classBlock.ts    # 课程数据类型
├── utils/               # 工具函数
│   ├── day.ts           # 日期工具函数
│   └── mock.ts          # 模拟数据
├── images/              # 图片资源
├── App.tsx              # 根组件
├── App.scss             # 全局样式
├── index.scss           # 重置样式
└── main.tsx             # 入口文件
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm  run dev
```

启动后访问 http://localhost:5173


## 📖 使用说明

### 添加事件
1. 在课表空白区域点击
2. 填写标题（如：自习）
3. 填写内容（如：红岩网校工作站）
4. 选择周次（可多选）
5. 使用时间选择器选择星期和节次
6. 点击确定按钮

### 编辑事件
1. 点击已添加的自定义事件
2. 在详情弹窗中点击编辑按钮
3. 修改表单内容
4. 点击确定按钮保存

### 删除事件
1. 在编辑表单中点击删除按钮
2. 确认删除后事件将从课表中移除

### 周视图切换
- 点击「上一周」/「下一周」切换周次
- 点击「回到本周」快速返回当前周

## 🧩 组件说明

### AddEvent 组件
事件添加/编辑表单，支持新增和编辑两种模式。

**Props**：
| 属性 | 类型 | 说明 |
|------|------|------|
| week | number | 当前周数 |
| visible | boolean | 弹窗显隐 |
| onCancel | () => void | 取消回调 |
| onConfirm | (data) => void | 确认回调 |
| onDelete | () => void | 删除回调 |
| editData | addInfoType | 编辑数据 |

### TimePicker 组件
滚轮式时间选择器，支持星期、开始节次、结束节次三列独立滚动。

**Props**：
| 属性 | 类型 | 说明 |
|------|------|------|
| onChange | (data) => void | 选择变化回调 |
| value | selected | 受控值（可选） |

### ScheduleBody 组件
课表主体，包含日期栏、节次栏和课程卡片渲染。

**Props**：
| 属性 | 类型 | 说明 |
|------|------|------|
| weekNum | number | 当前周数 |
| eventVisible | boolean | 事件弹窗显隐 |
| onEventClick | () => void | 点击空白区域回调 |
| addInfoData | addInfoType | 自定义事件数据 |
| setEventVisible | (visible) => void | 设置事件弹窗显隐 |
| onEdit | (data) => void | 编辑回调 |

### CourseDetail 组件
课程详情弹窗，显示课程名称、教师、教室、时间等信息。

**Props**：
| 属性 | 类型 | 说明 |
|------|------|------|
| data | ClassBlockInterface | 课程数据 |
| detailVisible | boolean | 弹窗显隐 |
| setDetailVisible | (visible) => void | 设置弹窗显隐 |
| onEdit | (data) => void | 编辑回调 |

## 📊 数据类型

### addInfoType
```typescript
interface addInfoType {
  title: string          // 事件标题
  content: string        // 事件内容
  week: number           // 星期（1-7）
  startTime: number      // 开始节次（1-12）
  endTime: number        // 结束节次（1-12）
  selectedWeeks: number[] // 选中的周次数组
}
```

### ClassBlockInterface
```typescript
interface ClassBlockInterface {
  id: string
  courseInfo: {        // 课程信息
    className: string  // 课程名称
    teacher: string    // 教师
    classRoom: string  // 教室
    backgroundColor: string  // 背景颜色
    fontColor: string    // 字体颜色
  }
  weekday: number         // 星期（1-7）
  startSection: number    // 开始节次
  endSection: number      // 结束节次
  weekRule: number        // 周规则
  isCustom: boolean       // 是否自定义事件
}
```

## 🎨 设计说明

### 移动端适配
- 使用媒体查询 `@media (max-width: 768px)` 适配移动端
- 课表卡片自动调整大小
- 弹窗从底部滑入

### 动画效果
- 课程表入场动画（从底部弹出）
- 周数切换旋转动画
- 详情弹窗滑入/滑出动画


