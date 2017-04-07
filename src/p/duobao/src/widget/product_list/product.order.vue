//product.order.vue
<template>
    <div class="product-info">
        <div class='img-container'>
            <img :src="imgPath" onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';">
        </div>
        <div class="content">
            <h3 class="title">{{title}}&nbsp;</h3>
            <div class="info">
                <p class="number" >数量：{{number}}份</p>
                <p class="total">总计：<em>{{priceDesc}}元</em></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default (
        Vue.extend({
            data: function(){
                return {
                    priceDesc: '--'
                }
            },
            created: function(){
                if(this.price){
                    this.priceDesc = Number(this.price).toFixed(2)
                }
            }
        })
    );
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/var.less';
    .product-info {
        .flexbox();
        padding: .3rem;
        background-color: @white;
        .img-container {
            width: 1rem;
            height: 1rem;
            margin-right: .2rem;
            border: 1px solid @duobao-border;
            background-image: url(../../images/default_bg.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            overflow: hidden;
        }
        .content {
            .flexitem(1);
            width: 100%;
            .title {
                font-size: @font-nm - 0.02rem;
                color: @gray;
                .set-ellipsis-line(2);
                .set-line-height(2;@font-nm + .05rem;);
            }
            .info {
                .flexbox();
                width: 100%;
                color: @gray-light;
                font-size: @font-nm-sm;
                .number {
                    .flexitem(1);
                }
                em {
                    color: #ff5959;
                }
            }
        }
    }
</style>