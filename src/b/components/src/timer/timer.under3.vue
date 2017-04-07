<template >
    <span class="timer"><span v-show="this.day>=3"><span class="time day">{{day}}</span><span class="day-tip">天<span v-show="this.day==3">以上</span></span></span><em v-show="this.day<3"><span class="time">{{hour}}</span><i>:</i><span class="time">{{minitue}}</span><i>:</i><span class="time">{{second}}</span></span></em>
</template>
<script>
import base from './timer.mixin.vue'
export default ({
    mixins: [base],
    methods: {
        /**
         * @override
         * 覆盖的base，3天以下72小时及时
         * @param  {boolean} isInit [是否已经初始化]
         */
        counter: function(isInit){
            function singleToDouble(val){
                if(val < 10){
                    val = '0'+val
                }
                return val
            }
            if(Number(this.timeLeft) != 0){
                var end = new Date(this.timeLeft)
                var now = new Date()
                var delta = end.getTime() - now.getTime()
                this.day = Math.floor(delta/1000/60/60/24)
                if(this.day > 3){
                    this.day = 3
                }
                this.hour = Math.floor(delta/1000/60/60%72)
                this.minitue = Math.floor(delta/1000/60%60)
                this.second = Math.floor(delta/1000%60)
                if(this.hour <= 0 && this.minitue <= 0 && this.second <=0  && this.day < 3){
                    clearInterval(this.interval)
                    //Vue2.0去掉了组件事件树
                    if(window.Vue.version.match(/^1/)){
                        this.$dispatch('timerEnd')
                    }
                    this.$emit('timerEnd')
                }
                this.hour = singleToDouble(this.hour)
                this.minitue = singleToDouble(this.minitue)
                this.second = singleToDouble(this.second)
            }
        }
    }
})
</script>
<style lang='less'>

</style>