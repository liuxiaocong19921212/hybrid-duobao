//item.vue
<template>
    <li
        @click = 'onClick'
        :class = '{active : isActive}'
        v-show = 'robBuy'
        >
        <slot></slot>
    </li>
</template>
<script type="text/javascript">
    export default ({
        props:['content','idx'],
        data: function(){
            return {
                isActive: false,
                robBuy:true
            }
        },
        events: {
            reset: function(){
                this.isActive = false;
            },
            setActive: function(idx){
                if(this.idx == idx){
                    this.$dispatch('clickOne',idx);
                    this.isActive = true;
                }

            }
        },
        methods: {
            onClick: function(){
                this.$dispatch('clickOne',this.idx);
                this.isActive = true;
            }
        },
        created: function(){
            if(this.content.tabType){
                this.robBuy = false;
            };
            if(this.content.isActive)
                this.isActive = this.content.isActive
            if(!!this.isActive){
                this.$dispatch('clickOne',this.idx)
                this.isActive = true;
            }
        }
    })
</script>
<style lang='less'>
    @import '../core/less/var.less';
    .tab-nav {
        li {
            &.active:not(:only-child) {
                color: @red;
                border-bottom: .04rem @red solid;
            }
        }
    }
</style>
