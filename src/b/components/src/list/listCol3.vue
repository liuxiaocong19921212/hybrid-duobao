//list_col3.vue
<template>
    <div class='list col3' :style="styleObject" :class="className">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
    export default ({
        props: ['data','className'],
        data: function(){
            return {
                styleObject:{
                    backgroundColor: this.data.backgroundColor
                }
            }
        }
    })
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .list.col3 {
        background-color: transparent;
    }
</style>