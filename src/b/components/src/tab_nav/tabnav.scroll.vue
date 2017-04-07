//tabnav.scroll.vue
<template>
    <div class='tab-nav-container'>
        <ul class='tab-nav scroller'
        :style='[transform,transition]'
        @touchstart='touchstart'
        @touchmove='touchmove'
        @touchend='touchend'
        @transitionEnd='transitionEnd' >
        <item v-for = 'item in list' :content='item' :idx='$index' v-bind:style='[itemStyle]'>
            {{item.tagName}}
            <span v-if='item.number'>({{item.number}})</span>
        </item>
        </ul>
    </div>
</template>
<script>
import Item from './item.vue'
import Scroller from '../scroller/scroller.vue'
export default ({
    props: ['list','options'],
    data: function(){
        return {
            translateX: 0,
            lastX: 0,
            lastY: 0,
            curX: 0,
            curY: 0,
            delta: 0,
            deltaY: 0,
            easing: false,
            perSliders: 3.5,
            lastDeltaList:[],
            scrolling: true,
            isFirstFrame: false
        }
    },
    computed: {
        wrapperWidth: function(){
            return this.options ? this.options.wrapperWidth || document.body.offsetWidth : document.body.offsetWidth;
        },
        itemStyle: function(){
            var style = {
                'width':  this.perSliders == 'auto' ? 'auto' :(this.wrapperWidth/this.perSliders)+'px',
            }
            return style;
        },
        transform: function(){
            return {
                'transform': 'translate3d('+this.translateX+'px, 0,0)',
                '-webkit-transform': 'translate3d('+this.translateX+'px,0,0)',
                '-moz-transform': 'translate3d('+this.translateX+'px,0,0)',
            }
        },
        transition: function(){
            if(this.easing){
                return {
                    'transition': 'transform .3s ease-out',
                    '-webkit-transition': '-webkit-transform .3s ease-out',
                    '-moz-transition': '-moz-transform .3s ease-out'
                }
            }else{
                return {
                    'transition': 'transform 0s',
                    '-webkit-transition': '-webkit-transform 0s',
                    '-moz-transition': '-moz-transform 0s'
                }
            }
        }
    },
    components: {
        'item': Item,
        'scroller': Scroller
    },
    events: {
        clickOne: function(idx){
            this.easing = true;
            this.translateX = this.wrapperWidth/this.perSliders * (-idx+(this.perSliders-1)/2);
            if(this.perSliders != 'auto'){
                if(this.list.length>this.perSliders){
                    if(this.translateX>0){
                        this.translateX = 0;
                    }else if(this.translateX < -(this.list.length-this.perSliders) * this.wrapperWidth/this.perSliders){
                        this.translateX = -(this.list.length-this.perSliders) * this.wrapperWidth/this.perSliders;
                    }
                }else{
                    this.translateX = 0;
                }
            }else{
                var lengthToIdx = 0
                var lengthIdxRight = 0
                for(var i=0; i<idx; i++){
                    lengthToIdx += this.$el.querySelectorAll('li')[i].offsetWidth
                }
                lengthIdxRight = this.$el.offsetWidth - lengthToIdx
                this.translateX = -lengthToIdx
                if(this.$el.offsetWidth){
                    if(this.$el.offsetWidth + this.translateX < this.wrapperWidth){
                        this.translateX = this.wrapperWidth - this.$el.offsetWidth
                    }
                }else{
                    this.translateX = 0
                }
                
                /*if(this.$el.offsetWidth > this.wrapperWidth){
                    this.translateX = -(this.$el.offsetWidth - this.wrapperWidth)
                }else{
                    this.translateX = 0
                }*/
            }
            this.$broadcast('reset')
            return true
        }
    },
    methods: {
        touchstart: function(e){
            this.easing = false;
            this.curX = e.touches[0].pageX;
            this.lastX = this.curX;

            this.curY = e.touches[0].pageY
            this.lastY = this.curY;

            this.lastDeltaList = [];
            this.isFirstFrame = true;
        },
        touchmove: function(e){
            this.curX = e.touches[0].pageX;
            this.curY = e.touches[0].pageY;

            this.delta = this.curX - this.lastX;
            this.deltaY = this.curY - this.lastY;
            if(this.isFirstFrame){
                if(Math.abs(this.delta) > Math.abs(this.deltaY)*2){
                    this.scrolling = false
                }else{
                    this.scrolling = true
                }
            }
            if(!this.scrolling){
                e.preventDefault();
                if(this.perSliders != 'auto'){
                    if(this.translateX>0){
                        this.translateX += this.delta/2.5;
                    }else if(this.translateX< -(this.list.length-this.perSliders) * this.wrapperWidth/this.perSliders){
                        this.translateX += this.delta/2.5;
                    }else{
                        this.translateX += this.delta;
                    }
                }else{
                    if(this.translateX>0){
                        this.translateX += this.delta/2.5;
                    }else if(this.translateX < -(this.$el.offsetWidth - this.wrapperWidth)){
                        this.translateX += this.delta/2.5;
                    }else{
                        this.translateX += this.delta;
                    }
                }
                
                if(this.lastDeltaList.length==5)
                    this.lastDeltaList.shift();
                this.lastDeltaList.push(this.delta);
                this.lastX = this.curX;
            }
            this.isFirstFrame = false
        },
        touchend: function(e){
            this.easing = true;
            var sum=0;
            this.lastDeltaList.forEach(function(delta){
                sum += delta;
            })
            var average = sum/this.lastDeltaList.length;
            if(average)
                this.translateX += average*5;
            if(this.perSliders != 'auto'){
                if(this.list.length>this.perSliders){
                    if(this.translateX>0){
                        this.translateX = 0;
                    }else if(this.translateX < -(this.list.length-this.perSliders) * this.wrapperWidth/this.perSliders){
                        this.translateX = -(this.list.length-this.perSliders) * this.wrapperWidth/this.perSliders;
                    }
                }else{
                    this.translateX = 0;
                }
            }else{
                if(this.translateX < -(this.$el.offsetWidth - this.wrapperWidth)){
                    this.translateX = this.wrapperWidth - this.$el.offsetWidth
                }else{
                    this.translateX = 0
                }
            }
        },
        transitionEnd: function(e){
            this.easing = false;
        }
    },
    created: function(){
        this.perSliders = this.options.perSliders || this.perSliders
        this.list.forEach(function(item,idx){
            if(idx == 0)
                item.isActive = true;
            else
                item.isActive = false;
        })
    },
    compiled: function(){
        var _this = this;
        this.$el.addEventListener('webkitTransitionEnd',function(){
            _this.transitionEnd();
        })
        this.$el.addEventListener('mozTransitionEnd',function(){
            _this.transitionEnd();
        })
    }
})
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .tab-nav-container {
        overflow: hidden;
        background-color: @white;
        border-bottom: @border-nm;
        min-width: 100%;
    }
    .tab-nav.scroller {
        display: -webkit-box;
        background-color: @white;
        height: .84rem;
        color: @gray-dark;
        li {
            padding: 0 .1rem;
            overflow: hidden;
            white-space:nowrap;
            text-align: center;
            line-height: .84rem;
            height: 100%;
            font-size: .28rem;
        }
    }
</style>
