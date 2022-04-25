<template>
    <!-- <div ref="toast" class="toast" @click="fadeout" :class="classes" :style="styles">
        <span class="toast-message">{{ message }}</span>
    </div> -->
    <div class="toast-full">
        <span class="toast-bg" :style="bgStyles">
            <span class="toast-message" :class="classes" :style="styles">{{message}}</span>
        </span>
    </div>
</template>

<script>
    import lodash from 'lodash'

    export default {
        name: 'Toast',
        data() {
            return {
                classes: [],
                styles: {},
                bgStyles: {}
            }
        },
        props: {
            message: String,
            duration: {
                type: Number,
                default: 2000 // 持续显示的时长，单位 ms 为 0 则不自动消失需手动点击
            },
            position: {
                // 定位，数组格式支持自定义位置，左上比较常用所以顺序为[left, top, right, bottom],
                // 单位:px, 若为 0~1 之间的小数时则表示占屏幕的百分比%
                // default(){return [.1, .1]},
                // 定位，预设 topLeft|topCenter|topRight|centerLeft|center|centerRight|bottomLeft|bottomCenter|bottomRight
                default: 'topCenter',
            },
            zIndex: {
                type: Number,
                default: 9999
            },
            maxWidth: {
                type: String,
                default: '300px'
            },
            offsetX: {
                type: Number,
                default: 0
            },
            offsetY: {
                type: Number,
                default: 0
            },
            type: {
                type: String,
                default: 'default' //'error' | 'warning' | 'default' | 'success'
            }
        },
        created: function() {
            this.$nextTick(function() {
                this.show()
            });
        },
        destroyed: function() {
            this.$el.parentNode.removeChild(this.$el)
        },
        methods: {
            fadeout() {
                this.classes.push('fadeout') // 淡出效果直接覆盖了 fadein 的 css 设置
                lodash.delay(() => this.$destroy(), 500); // 淡出动画结束后再销毁
            },
            show() {
                
                // if (lodash.isArray(this.position)) {
                //     const [left, top, right, bottom] = this.position;
                //     const resolve = (s, n) => {
                //         if (n !== undefined) this.$set(this.styles, s, (n > 0 && n < 1) ? (n * 100) + '%' : n +
                //             'px');
                //     };
                //     resolve('top', top);
                //     resolve('right', right);
                //     resolve('bottom', bottom);
                //     resolve('left', left);
                // }
                // const isPrePos = lodash.isString(this.position); // 是字符串则认定为默认的预设定位点
                // if (isPrePos) {
                //     const pos = this.position.toString();
                //     const isC1 = pos.indexOf('center') > -1;
                //     const isC2 = pos.indexOf('Center') > -1;

                //     // 设置预设定位点样式
                //     this.classes.push(pos.replace(/([A-Z])/, (s) => '-' + s.toLowerCase()));

                //     // 居中定位修正
                //     if (isC1 || isC2) {
                //         if (pos === 'center' || isC1) {
                //             this.$set(this.styles, 'marginTop',
                //                 ((isPrePos ? (this.$refs.toast.clientHeight * -1 / 2) : 0) + this.offset[1]) + 'px');
                //         }
                //         if (pos === 'center' || isC2) {
                //             this.$set(this.styles, 'marginLeft',
                //                 ((isPrePos ? (this.$refs.toast.clientWidth * -1 / 2) : 0) + this.offset[0]) + 'px');
                //         }
                //     }
                // }
                // 添加淡入效果
                
                // this.$set(this.bgStyles, 'zIndex', this.zIndex)
                this.$set(this.bgStyles, 'marginTop', this.offsetY + 'px')
                this.$set(this.bgStyles, 'marginLeft', this.offsetX + 'px')
                this.$set(this.styles, 'maxWidth', this.maxWidth)
                this.classes.push(this.type)
                this.classes.push('fadein')
                this.duration > 0 && lodash.delay(() => {
                    this.fadeout()
                }, this.duration)
            },
        }
    }
</script>

<style scoped>
    .toast-full {
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .toast-bg {
        border-radius: 5px;
        background-color: white;
    }

    .toast-message {
        display: inline-block;
        max-width: 80vw;
        padding: 0.5rem 1rem;
        text-align: center;
        font-size: 14px;
        border-radius: 5px;
        opacity: 0;
        background: white;
        color: black;
        border: 1px solid #CCCCCC;
        box-shadow: #E9ECEF 0px 0px 3px;
    }

    .toast-message.error {
        background: rgba(255, 0, 0, 0.2);
        color: darkred;
        border: 1px solid rgba(255, 0, 0, 0.2);
        box-shadow: #E9ECEF 0px 0px 3px;
    }

    .toast-message.success {
        background: #32CD3233;
        color: #32CD32;
        border: 1px solid #32CD324D;
        box-shadow: #E9ECEF 0px 0px 3px;
    }

    /* .toast {
        display: block;
        position: fixed;
        padding: .5rem;
        font-size: .8rem;
        background-color: green;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
        opacity: 1;
        word-break: break-all;
        word-wrap: break-word;

        width: 100%;
        height: 100%;
        z-index: 9999;
        color: #FF5500;
        max-width: 300px;
        margin-top: 100px;
        margin-left: 100px;
    } */

    .toast.top-left {
        top: 0;
        left: 0;
    }

    .toast.top-center {
        top: 0;
        left: 50%;
    }

    .toast.top-right {
        top: 0;
        right: 0;
    }

    .toast.center-left {
        top: 50%;
        left: 0;
    }

    .toast.center {
        top: 50%;
        left: 50%;
    }

    .toast.center-right {
        top: 50%;
        right: 0;
    }

    .toast.bottom-left {
        bottom: 0;
        left: 0;
    }

    .toast.bottom-center {
        bottom: 0;
        left: 50%;
    }

    .toast.bottom-right {
        bottom: 0;
        right: 0;
    }

    .toast-message.fadein {
        opacity: 1;
        transition: opacity ease-in .2s;
    }

    .toast-message.fadeout {
        opacity: 0;
        transform: scale(.5);
        transition: all ease-in-out .4s;
    }
</style>
