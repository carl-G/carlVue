// Vue.util.defineReactive(this,'current','/')

function defineReactive (obj, key, val) {
    //递归
    observe(val)

    // 属性拦截
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                observe(newVal)
                val = newVal
            }
        }
    })
}

// 遍历传入obj的所有属性，执行响应式处理
function observe(obj) {
    // 首先判断obj是对象
    if (typeof obj !== 'object' || obj == null) return obj
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

// 动态新增属性
function set(obj, key, value) {
    defineReactive(obj, key, value)
}

const obj = {
    foo: 'foo',
    carl: 'carl'
}

set(obj, 'setdome', 'set')

// 2.不支持数组
// 解决方案是 拦截数组的七个变更方法，自己重写，覆盖他们，让他们进行数组操作的同时，进行变更通知；