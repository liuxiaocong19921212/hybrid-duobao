//gotop.solid.vue
<template>
    <i id='gotop' :class='class' v-show="isShow" transition='gotop' @click='onClick'>
    </i>
</template>
<script>
    import base from './gotop.default.vue'
    export default ({
        mixins: [base],
        data: function () {
            return {
                isShow: false,
                class: 'solid'
            }
        }
    })
</script>
<style lang="less">
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    @import '../core/less/utils.less';
    @import './style/gotop.less';
    #gotop {
        &.solid {
            .gotop-size();
            .background-image-nm(url(images/gotop.png));
            border-radius: @gotop-height;
            text-align: center;
            line-height: @gotop-height;
            height: @gotop-height;
        }
    }
</style>
