//list_col2.vue
<template>
    <div class='list col2'  :class="className">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
    export default ({
        props: ['data','className'],
        created: function () {
        },
        ready: function(){
        }
    })
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .list {
        background-color: @white;
    }
</style>