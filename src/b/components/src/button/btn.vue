//btn.vue
<template>
    <a class='ui btn' @touchstart='touchstart'  :href="href"  :class="{'hover': Hover, 'disabled': isDisabled}">
        <slot></slot>
    </a>
</template>
<script>
    module.exports = {
        props:['isDisabled','href'],
        data: function(){
            return {
                Hover: false
            }
        },
        created: function(){
            if(this.isDisabled === 'true')
                this.isDisabled = true;
            else if(this.Disabled === 'false')
                this.isDisabled = false;

            if(this.isDisabled != true){
                this.isDisabled = false;
            }else{
                this.isDisabled = true;
            }
            var self = this
            document.addEventListener('touchend',function(e){
                if(!self.isDisabled)
                    self.Hover = false;
            })
        },
        methods: {
            touchstart: function(){
                if(!this.isDisabled)
                    this.Hover = true;
            }
        }
    }
</script>

<style lang='less'>
    @import '../core/less/var.less';
    .ui {
        &.btn {
            @padding: 0 .2rem;
            @height-sm: .56rem;
            @height: .72rem;
            @height-lg: .8rem;
            @height-lger: .84rem;
            @br: .04rem;
            display: inline-block;
            padding: @padding;
            &[data-icon]:before {
                display: inline;
                line-height: @height-sm;
                font-size: @font-nm;
            }
            &.default {
                border-radius: @br;
                background-color: @red;
                font-size: @font-nm;
                color: @white;
                line-height: @height;
                &.hover {
                    background-color: @red-dark;
                }
                &.disabled {
                    background-color: @gray-lighter;
                    color: @gray-light;

                }
                &.large {
                    line-height: @height-lg;
                    font-size: @font-lg;
                    &.disabled {
                        background-color: @red;
                        color: @white;
                        opacity: .3;
                    }
                }
            }
            &.inline {
                line-height: @height-lger;
                background-color: @red;
                font-size: @font-lg;
                color: @white;
                border-radius: none;
                &.disabled {
                    .default.disabled;
                }
                &.hover {
                    .default.hover;
                }
            }
            &.reverse {
                line-height: @height-sm;
                border-radius: @br;
                border: .02rem @red solid;
                color: @red;
                background-color: @white;
                font-size: @font-nm;
                &.hover {
                    background-color: @red;
                    color: @white;
                }
                &.disabled {
                    opacity: .3;
                }
                &.gray {
                    background-color: @white;
                    color: @gray;
                    border: .02rem @gray-border solid;
                    &.hover {
                        background-color: @gray-border;
                    }
                }
            }
            &.icon-btn {
                font-size: @font-nm;
                border: .02rem @gray solid;
                color: @gray;
                &.hover {
                    color: @white;
                    background-color: @gray;
                }
            }
            &.block {
                display: block;
                border-radius: 0;
                text-align: center;
            }
        }
    }

</style>
