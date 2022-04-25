import ToastComponent from './toast.vue'
// import Main from './main.vue'
// import Vue from "vue"

// // var Toast = {}
// // let isShow = false
// // let toastVueObj

// // Toast.install = function() {
// //     const ToastConstructor = Vue.extend(ToastComponent)
// //     Vue.prototype.$toast = function(message) {
// //         if (isShow) {
// //             return;
// //         }
// //         isShow = true
// //         toastVueObj = new ToastConstructor({
// //             data: {
// //                 message,
// //                 isShow
// //             }
// //         })
// //         let toastNode = toastVueObj.$mount().$el
// //         document.body.appendChild(toastNode)
// //         setTimeout(() => {
// //             toastVueObj.isShow = isShow = false
// //         }, 1500);
// //     }
// // }

const Toast = {
    install: (Vue) => {
        const ToastConstructor = Vue.extend(ToastComponent)
        Vue.prototype.$toast = function(options = {}) {
            const instance = new ToastConstructor({
                el: document.createElement('div'),
                propsData: options
            })
            document.body.appendChild(instance.$el)
        }
    }
}

export default Toast

// const Toast = {
//     // 参数为对象时，需要提供install方法
//     install: (Vue) => {
//         const ToastConstructor = Vue.extend(Main)
//         Vue.prototype.$toast = (options = {}) => {

//             if (typeof options === 'string') {
//                 options = {
//                     message: options
//                 }
//             }
//             const instance = new ToastConstructor({
//                 el: document.createElement('div'),
//                 data: options
//             })
//             instance.$mount()
//             document.body.appendChild(instance.$el)
//             instance.visible = true

//         } // toast提示,通过this.$toast调用
//     }
// }

// export default Toast


// // https://cn.vuejs.org/v2/api/#Vue-extend
// // 创建构造器
// let ToastConstructor = Vue.extend(Main);
// let instance
// let seed = 1 // 计数
// const Toast = (options = {}) => {
//     //判断如果传入的是一个字符串，那么就使用message提示
//     if (typeof options === 'string') {
//         options = {
//             message: options
//         }
//     }
//     let id = `toast_${seed++}`
//     instance = new ToastConstructor({
//         data: options
//     }) // 创建对象实例
//     instance.id = id
//     // https://cn.vuejs.org/v2/api/#vm-mount
//     // 手动挂载一个实例并插入到 body 中
//     instance.$mount()
//     document.body.appendChild(instance.$el)
//     instance.visible = true
//     return instance
// }

// Vue.prototype.$toast1 = Toast
// // export default Toast
