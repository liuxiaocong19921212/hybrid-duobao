//productTagPrice.vue
<template>
    <em class='tag-price' v-if='data.price != data.originPrice && data.originPrice'>省：&#65509;{{data.originPrice - data.price}} </em>
</template>
<script>
export default ({
    props:['data']
})
</script>
<style lang='less'>
@import '../core/less/var.less';
.product {
    .tag-price {
        display: table;
        padding: .025rem .1rem;
        margin-bottom: .05rem;
        border: .02rem solid @red;
        color: @red;
        font-size: .2rem;
    }
}
</style>
