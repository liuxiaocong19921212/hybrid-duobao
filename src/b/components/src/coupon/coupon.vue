<template>
    <div class='coupon'>
        <div class='info'>
            <span class='price'><small>&#65509;</small>5</span>
            <div class='container prom'>
                <span class='prom'>满减50</span>
                <span class='prom'>满减50</span>
            </div>
        </div>
        <button>立即领取</button>
    </div>
</template>
<script>
export default ({

})
</script>
<style lang="less">
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .default() {
        padding: .2rem .1rem;
        background-color: @red;
        color: @white;
        font-size: @font-nm;
        button {
            color: @red;
            background: -webkit-gradient(linear, 0% 0%, 10% 10%, from(@white), to(@gray-light));
            background: -webkit-linear-gradient(top, @white, @gray-light);
            font-size: .24rem;
            padding: .2rem;
        }
        .price {
            position: relative;
            line-height: 1;
            font-size: .7rem;
            padding-left: .2rem;
            small {
                position: absolute;
                top: 0;
                left: 0;
                font-size: .3rem;
                line-height: 1.5;
            }
        }
    }
    .list {
        &.list-coupon {
            &.col1 {
                .coupon {
                    .default();
                    .flexbox();
                    .flexbox.center();
                    width: 100%;
                    .prom {
                        &.container {
                            display: inline;
                            margin: .1rem;
                        }
                        font-size: .3rem;
                    }
                }
            }
            &.col2 {
                .flexbox();
                .flexbox.center();
                .coupon {
                    .default();
                    .flexitem(1);
                    .flexbox();
                    .flexbox.vertical();
                }
            }
        }

    }
</style>
