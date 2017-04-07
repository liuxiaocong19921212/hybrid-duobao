<template>
    <div class="mask default">
        <p class="content">
            <slot></slot>
        </p>
    </div>
</template>
<script type="text/javascript">
export default ({

})
</script>
<style lang="less">
@import '../core/less/utils.less';
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    @import './style/product.less';
    .product {
        .container {
            &.img {
                .mask {
                    &.default {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        .flexbox();
                        .flexbox.center();
                        z-index: @z-mid;
                        .content {
                            width: 1.16rem;
                            .set-line-height(1;1.16rem;);
                            color: @white;
                            background-color: rgba(0,0,0,0.6);
                            border-radius: 100%;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

</style>
