//gotop.default.vue
<template>
    <i id='gotop' :class='class' v-show="isShow" transition='gotop' @click='onClick' data-icon="&#x0030">
    </i>
</template>
<script>
    export default ({
        data: function() {
            return {
                isShow: false,
                class: 'default'
            }
        },
        created: function(){
            var _this = this;
            var scroll = function(e){
                if(window.scrollY > window.screen.availHeight){
                    _this.isShow = true
                }else{
                    _this.isShow = false
                }
                window.requestAnimationFrame(scroll)
            }
            window.requestAnimationFrame(scroll)
        },
        methods: {
            onClick: function(){
                var speed =  window.scrollY/10 < 220 ? 220 : window.scrollY/10
                function scrollTop(){
                    window.scrollTo(0,window.scrollY - speed)
                    if(window.scrollY > 0)
                        requestAnimationFrame(scrollTop)
                }
                window.requestAnimationFrame(scrollTop)
            }
        }
    })
</script>
<style lang="less">
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    @import './style/gotop.less';
    #gotop {
        &.default {
            .gotop-size();
            border-radius: .1rem;
            background-color: rgba(0,0,0,0.6);
            font-size: .4rem;
            text-align: center;
            &:before{
                -webkit-transform: rotate(90deg) translateY(5%);
                transform: rotate(90deg) translateY(5%);
            }
        }
    }
</style>
