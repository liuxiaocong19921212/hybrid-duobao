//tabnav.scroll.vue
<template>
    <div class='tab-nav-img-container' style="background: {{templeteStateColor.templateBgColor}}">
        <ul class='tab-nav-img scroller'
        :class="{'picModel':picModel}"
        :style='[transform,transition]'
        @touchstart='touchstart'
        @touchmove='touchmove'
        @touchend='touchend'
        @transitionEnd='transitionEnd' >
        <item 
            v-for = 'item in list' 
            :content='item' 
            :idx='$index'
            v-bind:style='[itemStyle]'
        >
            <a @click="templetScroll($index)" href="{{item.href}}">
                <i v-if="picModel" class="tab-nav-pic">
                    <img src="{{item.defaultImageUrl}}" alt="">
                    <img v-if="item.selectImageUrl" class="selectImg" src="{{item.selectImageUrl}}" alt="">
                </i>
                <h2>{{item.tagName}}</h2>
                <i class="line"></i>
            </a>
        </item>
        </ul>
    </div>
</template>
<script>
import Item from './item.vue'
import Scroller from '../scroller/scroller.vue'
export default ({
    props: ['list','options','templeteStateColor'],
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
            perSliders: 'auto',
            lastDeltaList:[],
            scrolling: true,
            isFirstFrame: false,
            picModel:false
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
            /*
             * 背景、文字颜色处理
            */
            var tabTag = this.$el.querySelectorAll('li');
                for(var i = 0;i<tabTag.length;i++){
                    tabTag[i].children[0].style.background = this.templeteStateColor.templateBgColor;
                    tabTag[i].children[0].style.color = this.templeteStateColor.defaultFontColor;
                    if(tabTag[i].querySelector('.selectImg')){
                        tabTag[i].querySelector('.selectImg').previousSibling.previousSibling.style.display='block';
                        tabTag[i].querySelector('.selectImg').style.display = 'none';
                    };
                }
                if(tabTag[idx]){
                    tabTag[idx].children[0].style.background = this.templeteStateColor.selectBgColor;
                    tabTag[idx].children[0].style.color = this.templeteStateColor.selectFontColor;
                    tabTag[idx].querySelector('.line').style.background = this.templeteStateColor.selectFontColor;
                    if(tabTag[idx].querySelector('.selectImg')){
                        tabTag[idx].querySelector('.selectImg').previousSibling.previousSibling.style.display='none';
                        tabTag[idx].querySelector('.selectImg').style.display = 'block';
                    }
                };
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
                if(this.$el.querySelectorAll('li')[idx]){
                    lengthToIdx =lengthToIdx - this.$el.querySelectorAll('li')[idx].offsetWidth;
                    if(lengthToIdx <0){
                        lengthToIdx = 0;
                    }
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
        templetScroll:function(len){
            if(this.list[len].scrollPosition != undefined){
                document.body.scrollTop = document.getElementById('templet'+this.list[len].scrollPosition).offsetTop;
            };
        },
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
                var eleWidth = 0;
                for(var i =0;i<this.$el.querySelectorAll('li').length;i++){
                    eleWidth += this.$el.querySelectorAll('li')[i].offsetWidth;
                }
                if(this.translateX >0 || eleWidth < this.wrapperWidth){
                    this.translateX = 0;
                }else if(eleWidth-this.wrapperWidth<= -(this.translateX)){
                    this.translateX = -(eleWidth-this.wrapperWidth);
                };
                
            }
        },
        transitionEnd: function(e){
            this.easing = false;
        }
    },
    created: function(){
        /*
         * firstTab 第一个可用标签
         * tabPic   标签图片个数
         * listLen  总标签个数
         */
        var _scope = this,
            firstTab = 0,
            tabPic = 0,
            listLen = 0;
        this.perSliders = this.options.perSliders || this.perSliders
        this.list.forEach(function(item,idx){
            if(!item.tabType){
                firstTab++;
                listLen++;
                if(item.defaultImageUrl){
                    tabPic++;
                }
            };
            if(firstTab == 1){
                item.isActive = true;
            };
        })
        if(listLen == tabPic){
            this.picModel = true;
        }
    },
    compiled: function(){
        var _this = this,
            tabActive = this.$el.querySelector('.active'),
            tabTag = this.$el.querySelectorAll('li');
        if(tabActive){
            for(var i = 0;i<tabTag.length;i++){
                tabTag[i].children[0].style.background = this.templeteStateColor.templateBgColor;
                tabTag[i].children[0].style.color = this.templeteStateColor.defaultFontColor;
                if(tabTag[i].querySelector('.selectImg')){
                    tabTag[i].querySelector('.selectImg').previousSibling.previousSibling.style.display='block';
                    tabTag[i].querySelector('.selectImg').style.display = 'none';
                }
            }
            tabActive.children[0].style.color = this.templeteStateColor.selectFontColor;
            tabActive.children[0].style.background = this.templeteStateColor.selectBgColor;
            tabActive.querySelector('.line').style.background = this.templeteStateColor.selectFontColor;
            if(tabActive.querySelector('.selectImg')){
                tabActive.querySelector('.selectImg').previousSibling.previousSibling.style.display='none';
                tabActive.querySelector('.selectImg').style.display = 'block';
            }
        };
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
    .tab-nav-img-container {
        top: 0;
        z-index: @z-mid + 1;
        min-width: 100%;
        background: @white;
    }
    .tab-nav-img.scroller {
        display: -webkit-box;
        background: initial;
        height: .84rem;
        color: @gray-dark;
        &.picModel{
            height: 1.1rem;
            li{
                font-size: .26rem;
            }
        }
        li {
            &.active{
                a{
                    background: #fdeaea;
                    color: @theme;
                }
                i.line{
                    position: absolute;
                    width: .39rem;
                    height: .04rem;
                    background: @theme;
                    left: 50%;
                    margin-left: -.195rem;
                    bottom:0;
                }
            }
            min-width: 1.4rem;
            overflow: hidden;
            white-space:nowrap;
            text-align: center;
            height: 100%;
            font-size: .28rem;
            position: relative;
            a{
                height: 100%;
                display: block;
                padding: 0 .16rem;
                padding-top: .14rem;
                i.tab-nav-pic{
                    display: block;
                    width: .44rem;
                    height: .44rem;
                    margin-left: 50%;
                    position: relative;
                    img{
                        position: absolute;
                        top: 0;
                        left: -.22rem;
                        height: 100%;
                        &.selectImg{
                            display: none;
                        }
                    }
                }
                h2{
                    margin-top: .12rem;
                }
            }
        }
    }
</style>
