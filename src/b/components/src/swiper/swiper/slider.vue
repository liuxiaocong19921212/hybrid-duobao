//slider.vue
<template>
    <div class='slider' v-bind:style='[otherStyle]' >
        <slot></slot>
    </div>
</template>
<script>
    module.exports = {
        props:['index','content','options','height'],
        data: function(){
            return {
                pos: 0,
                otherStyle: {
                    'height': 'auto',
                    'width': '1px',
                    'left': '0',
                    'position': 'relative'
                }
            }
        },
       /* computed: {
            transform: function(){
                return {
                    'transform': 'translate3d('+this.pos+'px, 0,0)',
                    '-webkit-transform': 'translate3d('+this.pos+'px,0,0)',
                    '-moz-transform': 'translate3d('+this.pos+'px,0,0)',
                }
            }
        },*/
        created: function(){
            //init options
            this.options = this.options || {
                loop: false,
                perSliders: 1,
                perGroup: 1,
                autoPlay: false,
                pagination: true
            };
            if(this.options.height)
                this.otherStyle.height = this.options.height;
            this.otherStyle.width = this.options.wrapperWidth/this.options.perSliders+'px';
            if(!!this.options.loop)
                this.otherStyle.left = -this.options.wrapperWidth/this.options.perSliders+'px';
        },
        methods: {
            /*onClick: function(idx){
                this.$dispach('clickOne',idx)
            }*/
        },
        events: {
            resize: function(width){
                this.otherStyle.height = this.height;
                this.otherStyle.width = width/this.options.perSliders+'px';
                if(!!this.options.loop)
                    this.otherStyle.left = -width/this.options.perSliders+'px';
            }
        }
    }
</script>
<style lang='less'>

</style>
