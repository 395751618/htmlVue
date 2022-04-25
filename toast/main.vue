<template>
    <transition name="fade">
        <div id="toast" v-if="visible">
            <div class="toast">{{message}}</div>
        </div>
    </transition>
</template>

<script>
    export default {
        watch: {
            closed(val) {
                if (val) {
                    this.visible = false;
                    // this.destroyElement();
                }
            }
        },
        data() {
            return {
                visible: false,
                message: "",
                duration: 3, // 显示时长，秒
                closed: false, // 用来判断消息框是否关闭
                timer: null // 计时器
            };
        },
        mounted() {
            this.startTimer();
        },
        methods: {
            //完全销毁实例
            destroyElement() {
                // https://cn.vuejs.org/v2/api/#vm-destroy
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            },
            //计时器，根据 duration 去修改组件的开关状态
            startTimer() {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.closed = true;
                        clearTimeout(this.timer);
                    }
                }, this.duration * 1000);
            }
        }
    };
</script>

<style lang="scss" scoped>
    #toast {
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .toast {
            display: inline-block;
            max-width: 80vw;
            background: rgba(24, 151, 119, 0.63);
            padding: 0.5rem 1rem;
            text-align: center;
            color: white;
            font-size: 14px;
        }
    }

    .fade-enter-active {
        animation: fade 1s;
    }

    .fade-leave-active {
        animation: fade 1s reverse;
    }

    @keyframes fade {
        0% {
            transform: scale(1) translateX(200px);
            opacity: 0;
        }

        100% {
            transform: scale(1) translateX(0);
            opacity: 1;
        }
    }
</style>
