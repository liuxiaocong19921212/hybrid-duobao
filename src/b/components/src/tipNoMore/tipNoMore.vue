<template>
    <div class="tip-no-more">
        <i class="line"></i>
        <i class='dot'></i>
        <span class="text">看完啦</span>
        <i class='dot'></i>
        <i class="line"></i>
    </div>
</template>
<script>
export default Vue.extend({})
</script>
<style lang='less'>
    @import "../core/less/var.less";
    @import "../core/less/layout.less";
    @import "../core/less/utils.less";
    @gray-border: #e6e6e6;
    .tip-no-more {
        .flexbox();
        .flexbox.center();
        .set-line-height(1;1.2rem);
        padding: 0 .2rem;
        font-size: @font-nm-sm;
        color: @gray;
        .text {
            width: @font-nm-sm * 4;
            text-align: center;
        }
        .line {
            .flexitem(1);
            border-bottom: 1px solid @gray-border;
            height: 1px;
        }
        .dot {
            display: block;
            width: .1rem;
            height: .1rem;
            background-color: @gray-border;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            margin: 0 .1rem;
        }
    }

</style>
