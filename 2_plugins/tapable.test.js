const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable')
// 前两个同步钩子，后两个异步钩子

class Lesson {
    constructor() {
        // 初始化钩子容器
        this.hooks = {
            go: new SyncBailHook(['addre']), // 前一个钩子有返回就不执行后面的钩子了
            // leave: new AsyncParallelHook(['name', 'age']),  // 异步并行钩子，异步的钩子一起执行
            leave: new AsyncSeriesHook(['name', 'age']),  // 异步串行执行
        }
    }
    tap() {
        // 向钩子中注册相应的事件
        this.hooks.go.tap('class0318', (address) => {
            console.log('class0318', address)
            return 11
        })
        this.hooks.go.tap('class0118', (address) => {
            console.log('class0118', address)
        })


        // 异步钩子绑定事件
        this.hooks.leave.tapAsync('class0918', (name, age, cb) => {
            setTimeout(() => {
                console.log('class0918', name, age)
                cb()
            }, 2000)
        })
        this.hooks.leave.tapPromise('class0693', (name, age) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('class0693', name, age)
                    resolve()
                }, 1000)
            })
        })
    }
    start() {
        // 触发钩子函数
        this.hooks.go.call('c318')

        // 触发异步钩子的事件
        this.hooks.leave.callAsync('jzhu', 21, () => {
            // 所有 leave 容器中的都钩子触发后，才会触发
            console.log('end')
        })
    }
}
const lesson = new Lesson()
lesson.tap()
lesson.start()