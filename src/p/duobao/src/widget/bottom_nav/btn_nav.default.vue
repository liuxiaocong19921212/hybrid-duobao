//btn_nav.default.vue
<template>
    <div class="blocker"></div>
    <div :class="'bottom-nav flexbox'">
        <div class="box v_center flex1">
            支付金额：<em>￥{{priceDesc}}</em>
        </div>
        <btn @click="onClick" class="default" :class="isEnabled">去支付</btn>
    </div>
</template>
<script>
    import comps from 'components'
    export default (
    Vue.extend({
        data: function(){
            return {
                priceDesc: '--'
            }
        },
        computed: {
            isEnabled: function(){
                if(this.enable)return ''
                else return 'disabled'
            }
        },
        created: function(){
            if(this.price){
                this.priceDesc = Number(this.price).toFixed(2)
            }
        },
        components: {
            btn: comps.Button 
        }
    }))
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../less/duobao.less';
    @fz: @font-lg-sm - 0.02rem;
    .bottom-nav {
        width: 100%;
        max-width: 640px;
        position: fixed;
        bottom: 0;
        background-color: @white;
        font-size: @fz;
        padding-left: @fz;
        border-top: 1px solid @duobao-border;
        .set-line-height(3;@fz);
        em {
            color: @red;
        }
        .ui.btn {
            width: 2rem;
            font-size: @fz !important;
            text-align: center;
            .set-line-height(3;@font-lg-sm);
            line-height: 3 * @fz;
            border-radius: 0;
        }
    }
    .blocker{
        .set-line-height(3;@fz);
    }
</style>