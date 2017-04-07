//flexgird.vue
<template>
    <div class='flexgrid'>
        <slot></slot>
    </div>
</template>
<script>
    export default ({
        
    })
</script>
<style lang="less">
    @import '../core/less/layout.less';
    .flexgrid {
        .flexbox();
    }
</style>