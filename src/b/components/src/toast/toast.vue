/**
 * toast组件
 */
<template>
    <div class="toast-container">
        <div class="toast">
           {{text}}
        </div>
    </div>
</template>
<script>
    export default (
        Vue.extend({
            created: function(){
                var _this = this
                setTimeout(function(){
                    _this.$remove();
                },1001)
            }
        })
    )
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/utils.less';
    @import '../core/less/layout.less';
    .toast-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: @z-max * 2;
        .flexbox();
        .flexbox.center();
        .toast {
            font-size: @font-nm;
            padding: .2rem;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: .04rem;
            max-width: 80%;
            color: @white;
            text-align: center;
            word-break: break-all;
            line-height: 1.3;
        }
    }
</style>