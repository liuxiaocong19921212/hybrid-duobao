<template>
    <span class="ui tag solid" ><slot></slot></span>
</template>
<script>
export default ({
})
</script>
<style lang="less">
    @import "../core/less/var.less";
    @import "../core/less/layout.less";
    @import "../core/less/utils.less";
    .ui {
        &.tag {
            &.solid {
                display: inline-block;
                font-size: @font-sm;
                background-color: @red;
                padding: .03rem .04rem;
                color: @white;
                border-radius: 2px;
            }
        }
    }
</style>
