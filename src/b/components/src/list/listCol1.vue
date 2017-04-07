//list_col1.vue
<template>
    <div class='list col1' :class="className">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
    export default ({
        props: ['className']
    })
</script>
<style lang='less'>
    @import '../core/less/var.less';
    .list {
        background-color: @white;
    }
</style>