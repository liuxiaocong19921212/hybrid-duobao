<template>
    <span class="ui tag icon-tag" ><slot name="icon"></slot><slot></slot></span>
</template>
<script>
export default ({
})
</script>
<style lang="less">
@import "../core/less/icon.less";
    @import "../core/less/var.less";
    @import "../core/less/layout.less";
    @import "../core/less/utils.less";
    .ui {
        &.tag {
            box-sizing: content-box;
            &.icon-tag {
                display: inline-block;
                font-size: @font-nm-sm;
                border: 1px solid @red;
                color: @red;
            }
        }
    }
</style>
