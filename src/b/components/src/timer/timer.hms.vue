<template >
    <span class="timer"><span v-show="this.day>=1"><span class="time day">{{day}}</span><span class="day-tip">天<span v-show="this.day==3">以上</span></span></span><em v-show="this.day<1"><span class="time">{{hour}}</span><i>时</i><span class="time">{{minitue}}</span><i>分</i><span class="time">{{second}}</span><i>秒</i></span></em>
</template>
<script>
import base from './timer.mixin.vue'
export default ({
    mixins: [base]
})
</script>
<style lang='less'>

</style>
