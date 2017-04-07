<template>
    <div class="phone-info">
        <div class="phone-number">
            <p>手机号码</p> <input  maxlength="11" type="text"  @blur="onBlur" @change="onChange" @click="onClick" v-model="number" :placeholder="placeholder">
        </div>
        <div class="phone-info-tips">
            手机号码很重要，我们会通过它联系您邮寄奖品。
        </div>
    </div>
</template>
<script>
    export default (
    Vue.extend({
        
    })
    )
</script>
<style lang='less'>
    
</style>