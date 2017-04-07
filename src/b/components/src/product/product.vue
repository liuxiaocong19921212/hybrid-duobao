//product.vue
<template>
    <div class='product'>
        <a class='react' :href="dontHref ? 'javascript:;' : data.href">
            <div class='container img'>
                <slot name='tag'></slot>
                <slot name='mask'></slot>
                <slot name='mask-bottom-bar'></slot>
                <img v-lazyload:adapter.product='data.imageUrl' onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='"><!--:src="data.imageUrl" >-->
            </div>
            <div class='container content'>
                <slot name='content'></slot>
            </div>
        </a>
    </div>
</template>
<script type="text/javascript">
    export default ({
        props:['data','dontHref','options','width','type'],
        data: function(){
            return {
                //style:{
                //    'height':'auto',
                //    'width':'100%'
                //},
                //buyNumber: '--'
            }
        },
        created: function(){
            if(!this.data){
                this.data = {
                    href: '',
                    imageUrl: '',
                    price: '',
                    originPrice: ''
                }
            }
            /*if(this.width){
                if(String(this.width).match(/rem/)){
                    this.width = Number(this.width.replace('rem','')) * document.rem || 'auto';
                }
                this.style.width = this.width +'px'
            }
            this.style.height = this.width ? this.width+'px' :(this.options ? this.options.height+'px' || 'auto' : 'auto');*/
        },
        ready: function(){
            //this.style.height = this.$el.querySelector('img').offsetWidth+'px'
            //var width = this.$el.nextElementSibling.offsetWidth
            //this.style.height = width+'px';
        },
        methods: {
        }
    })
</script>
<style lang='less'>
    //@import '../core/less/var.less';
    //@import '../core/less/layout.less';
    //@import './style/product.less';
</style>
