//tabnav.scroll.vue
<template>
    <div class='scroller-container' :class="class">
        <div class='scroller'
        v-bind:style='[transform,transition]'
        :class="class"
        @touchstart='touchstart'
        @touchmove='touchmove'
        @touchend='touchend'
        @transitionEnd='transitionEnd'
         >
        	<slot></slot>
        </div>
    </div>
</template>
<script>
import mixin from "../swiper/swiper/swiper.mixin.vue";
export default ({
    props: ['options','list','class','direction'],
    mixins: [mixin],
    data: function(){
        return {
            maxTranslateX: 0,
            contentWidth: 0
        }
    },
    created: function(){
        this.initSwiper()
    },
    ready: function(){
        this.computeTransLimit()
        this.$watch('list',function(val){
            this.computeTransLimit()
        })
    },
    events: {
        scroll: function(e){
            this.computeTransLimit();
            if(this.contentWidth < this.wrapperWidth)return;
            if(this.translateX < -this.maxTranslateX || this.translateX > 0){
                this.translateX += this.delta/2.5
            }else{
                this.translateX += this.delta
            }
            this.$broadcast('scrollerCurPos', -this.translateX)
        },
        scrollEnd: function(e){
            if(this.translateX > 0){
                this.$dispatch('scrollerBounceToStart')
                this.$broadcast('scrollerBounceToStart')
                this.translateX = 0
            }
            if(this.translateX < -this.maxTranslateX){
                this.$dispatch('scrollerBounceToEnd')
                this.$broadcast('scrollerBounceToEnd')
                this.translateX = -this.maxTranslateX
            }
        },
    },
    methods: {
        computeTransLimit: function(){
            var children = this.$el.querySelector('.scroller').children
            this.contentWidth = 0
            for(var i=0; i<children.length; i++){
                this.contentWidth += children[i].offsetWidth
            }
            if(this.contentWidth < this.wrapperWidth)
                this.maxTranslateX = 0
            else
                this.maxTranslateX = this.contentWidth - this.wrapperWidth
            this.$dispatch('scrollerTransLimit',this.contentWidth < this.wrapperWidth ? null : this.maxTranslateX)
            this.$broadcast('scrollerTransLimit',this.contentWidth < this.wrapperWidth ? null : this.maxTranslateX)
        },
    }
});
</script>
<style lang='less'>
    @import "../core/less/var.less";
    @import '../core/less/layout.less';
    .scroller-container {
        overflow: hidden;
        background-color: @white;
    }
    .scroller {
        display: -webkit-box;
        background-color: @white;
    }
</style>
