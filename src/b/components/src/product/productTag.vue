<template>
    <div class="tag-product">
        <slot></slot>
        <slot name="triangle"></slot>
    </div>
</template>
<script>
export default ({
    props:['type']
})
</script>
<style lang='less'>
@import '../core/less/var.less';
    .tag-product {
        display: block;
        position: absolute;
        z-index: 102;
        right: 0;
        top: 0;
        color: #fff;
        line-height: 1;
        padding: .1rem .08rem .1rem .15rem;
        text-align: center;
        background-color: @bg-primary-color;
        font-size: @font-nm-sm;
        letter-spacing: .04rem;
        border-radius: .24rem 0 0 .24rem;
        /*-webkit-transform: rotate(45deg);*/
    }

</style>
