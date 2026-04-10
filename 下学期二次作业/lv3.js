//首先定义三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
//封装then方法返回值判断函数
const resolvePromise = (x, resolve, reject) => {
  if (x instanceof MyPromise) {
    x.then((res) => {
      resolve(res)
    }, (err) => {
      reject(err)
    })
  } else {
    resolve(x)
  }
}
//定义一个Promise类
class MyPromise {
  //构造器
  constructor(executor) {
    this.status = PENDING//初始状态为pending
    this.value = undefined
    this.reason = undefined//默认值
    //储存回调函数
    this.onfulfilledCallbacks = []//成功回调函数数组
    this.onrejectedCallbacks = []//失败回调函数数组
    //定义resolve
    const resolve = (value) => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value
      this.onfulfilledCallbacks.forEach((fn) => {
        fn()//执行成功回调函数
      })

    }
    //定义reject
    const reject = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      this.onrejectedCallbacks.forEach((fn) => {
        fn()//执行失败回调函数
      })

    }
    //执行executor函数并捕获同步异常
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  //定义then方法
  then(onfulfilled, onrejected) {
    //链式调用
    return new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        onfulfilled(this.value)
        let x = resolve(onfulfilled(this.value))//x为前一个then方法的返回值
        resolvePromise(x, resolve, reject)
      }
      if (this.status === REJECTED) {
        onrejected(this.reason)
        let x = resolve(onrejected(this.reason))//x为前一个then方法的返回值
        resolvePromise(x, resolve, reject)

      }
      if (this.status === PENDING) {
        this.onfulfilledCallbacks.push(() => {
          onfulfilled(this.value)
        })
        this.onrejectedCallbacks.push(() => {
          onrejected(this.reason)//传入回调函数的同时传递参数
        })
      }
    })

  }
}
//promise静态方法
//1.resolve()
MyPromise.resolve = (value) => {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  }
  )
}
//2.reject()
MyPromise.reject = (reason) => {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  }
  )
}
//3.race(),返回最快的结果
MyPromise.race = (PromiseArr) => {
  return new MyPromise((resolve, reject) => {
    PromiseArr.forEach((item) => {
      item.then((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  })
}
//4.all(),等待所有promise满足条件
MyPromise.all = (PromiseArr) => {
  let arr = []//存储结果
  let count = 0//记录成功次数
  let len = PromiseArr.length//记录数组长度
  return new MyPromise((resolve, reject) => {
    PromiseArr.forEach(val => {
      val.then((res) => {
        arr[count] = res
        count++
        if (count === len) {
          resolve(arr)
        }
      }, (err) => {
        reject(err)
      })
    })

  })
}


//
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)

})
console.log(p)
p
  .then(res => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
      resolve(200)
    })

  })
  .then(res => console.log(res))




