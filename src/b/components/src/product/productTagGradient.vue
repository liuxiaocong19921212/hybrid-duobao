<template>
    <div class="tag-linear">
        <slot></slot>
    </div>
</template>
<script>
    export default({
//        props:['direction','startColor','endColor'],
//        created: function () {
//            console.log(7777);
//            console.log(this.$parent.direction);
//            this.$set('gradient',"-webkit-linear-gradient(this.direction,this.startColor,this.endColor)")
//        }


    })
</script>
<style lang="less">
    @import '../core/less/var.less';
    .tag-linear{
        display: block;
        min-width: 1.1rem;
        position: absolute;
        z-index:99;
        right: 0;
        top: 0;
        color: #fff;
        height: @font-lg-sm;
        line-height: @font-lg-sm;
        padding: 0 @font-sm*0.2;
        text-align: center;
        background: linear-gradient(left,@red,rgb(254,30,101));
        bakground: -webkit-linear-gradient(left,@red,rgb(254,30,101));
        font-size: .26rem;
    }
</style>