//big_small.vue
<template>
    <div class='container bigsmall' :class='_class'>
        <div class='left'>
            <slot name='left'></slot>
        </div>
        <div class='right'>
            <slot name='right'></slot>
        </div>
    </div>
    <slot name='rest'></slot>
</template>
<script>
export default ({
    props: ['data','class'],
    computed: {
        //这个_class因为sublime的高良问题，才这么写的，并非最佳实践
        _class: function(){
            return this.class
        }
    }
})
</script>
<style lang='less'>
@import '../core/less/var.less';
@import '../core/less/layout.less';
    .bigsmall {
        border-top: @border-nm;
        border-bottom: @border-nm;
        &.no-border {
            border: none !important;
            .left {
                border: none !important;
                a {
                    border: none !important;
                }
            }
            .right {
                border: none !important;
                a {
                    border: none !important;
                }
            }
        }
        &.inside-border {
            border-top: none !important;
            border-bottom: none !important;
        }
        &.top-border {
            border-bottom: none !important;
        }
        &.bottom-border {
            border-top: none !important;
        }
        &.has-padding {
            margin: 0 .2rem;
        }
        &.container {
            .flexbox();
            &:not(:only-child) {
                border-bottom: @border-nm;
            }
            .left {
                border-right: @border-nm;
                .flexitem(1);
                .flexbox();
                .flexbox.vertical();
                width: 50%;
                a {
                    .flexitem(1);
                    position: relative;
                    height: 100%;
                    &:not(:last-child){
                        border-bottom: @border-nm;
                    }
                }
            }
            .right {
                .flexitem(1);
                .flexbox();
                .flexbox.vertical();
                width: 50%;
                a {
                    .flexitem(1);
                    height: 100%;
                    position: relative;
                    &:not(:last-child){
                        border-bottom: @border-nm;
                    }
                }
            }
            .big {
                img {
                    position: absolute;
                    height: 100%;   
                }
            }
        }
        &.rest {
            .grid(2);
            .flexbox();
            &:not(:last-child){
                border-bottom: @border-nm;
            }
            a {
                .flexitem(1);
                height: 100%;
                &:first-child {
                    border-right: @border-nm;
                }
            }
        }
    }
    
</style>
