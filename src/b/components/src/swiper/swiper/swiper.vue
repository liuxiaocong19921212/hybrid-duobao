   //scroller.vue
<template>
    <div class='swiper-container'
        v-on:touchmove='touchMove'
        v-on:touchstart='touchStart'
        v-on:touchend = 'touchEnd'
        v-on:transitionEnd = 'transitionEnd'>
        <div class='swiper' :style= '[transformY,transition,otherStyle]'>
                <slot name='slider'>
                </slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    module.exports = {
        props: ['list','options','cubic'],
        data: function(){
            return {
                //原始列表
                originList: [],
                //touch开始的位置
                startPos: 0,
                //touch结束的位置
                endPos: 0,
                //上一帧的位置
                lastPos: 0,
                //当前帧的位置
                curPos: 0,
                //每帧的变动
                delta: 0,
                //上一帧的位置
                lastPosY: 0,
                //当前帧的位置
                curPosY: 0,
                //每帧的变动
                deltaY: 0,
                //是否正在缓动
                easing: true,
                //是否允许开启动画
                animating: false,
                //当前的索引
                idx:0,
                //经过duplicate后列表的长度
                length:0,
                //translateX的值
                translateX:0,
                translateY:0,
                //窗口的宽
                firstFrame: true,
                scroll: false,
                //style
                otherStyle:{
                    'left': '0',
                    'height': 'auto',
                    'width': 'auto'
                },
                disableScreenScroll: false,
                frameCnt: 0,
                allowVerticalScroll: false,
                atBottom: false,
                computeVerticalScroll: false,
            }
        },
        computed: {
            btmToNextLimit: function(){
                return 0.1 * document.documentElement.clientHeight
            },
            pageCount: function(){
                var pageCount = this.originList.length/parseInt(this.options.perSliders);
                return Math.ceil(pageCount);
            },
            /*transform: function(){
                return {
                    'transform': 'translate3d('+this.translateX+'px, 0,0)',
                    '-webkit-transform': 'translate3d('+this.translateX+'px,0,0)',
                    '-moz-transform': 'translate3d('+this.translateX+'px,0,0)',
                }
            },*/
            transformY: function(){
                return {
                    'transform': 'translate3d('+this.translateX+'px, '+this.translateY+'px,0)',
                    '-webkit-transform': 'translate3d('+this.translateX+'px, '+this.translateY+'px,0)',
                    '-moz-transform': 'translate3d('+this.translateX+'px, '+this.translateY+'px,0)',
                }
            },
            transition: function(){
                if(this.easing){
                    return {
                        'transition': 'transform .3s ',
                        '-webkit-transition': '-webkit-transform .3s',
                        '-moz-transition': '-moz-transform .3s'
                    }
                }else{
                    return {
                        '-webkit-transition': '-webkit-transform 0s',
                        '-moz-transition': '-moz-transform 0s',
                        'transition': 'transform 0.1s',
                    }
                }
            },
            listWidth: function(){
                return this.wrapperWidth/this.options.perSliders * this.originList.length || 0;
            },
            wrapperWidth: function(){
                return this.options.wrapperWidth;
            },
            scrollEvent: function(){
                var event = document.createEvent('HTMLEvents');
                event.initEvent('scroll')
                event.eventType = 'message'
                return event;
            }
        },
        created: function(){
            //init
            var _this = this;
            window.addEventListener('scroll',function(e){
                if(_this.disableScreenScroll)
                    e.preventDefault();
            })
            document.addEventListener('touchmove',function(e){
                if(_this.disableScreenScroll)
                    e.preventDefault();
            })
            //clone list
            //init options
            this.options = this.options || {
                loop: false,
                perSliders: 1,
                perGroup: 1,
                autoPlay: false,
                pagination: true,
                height: 'auto',
                allowVerticalScroll: true,
            };
            if(!!this.options.height){
                this.otherStyle.height = this.options.height;
            }
            //如果是循环，则首尾重复
            if(!!this.options.loop){
                this.list.forEach(function(item,idx){
                    if(idx != 0 && idx != _this.list.length-1)
                        _this.originList.push(item);
                });
            }else{
				this.originList = this.list;
			}
            this.length = this.originList.length;
            //this.otherStyle.width = (this.wrapperWidth/this.options.perSliders*this.list.length)+'px'
            //是否自动播放
            if(!!this.options.autoPlay)
                this.autoPlay();

            //检测当前的索引值
            this.$watch('idx',function(idx){
                _this.$dispatch('idxChange',idx)
                _this.$broadcast('idxChange',idx)
            })
            var _renderFrame = function(){
                window.dispatchEvent(_this.scrollEvent)
                if(_this.animating)
                    window.requestAnimationFrame(_renderFrame)
            }
            this.$watch('animating',function(val){
                if(val)
                    window.requestAnimationFrame(_renderFrame)
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
        },
        ready: function(){
            //初始化swiper长度
            //this.wrapperWidth = this.$el.offsetWidth;
            this.$broadcast('resize',this.wrapperWidth,this.pageCount,this.options.height)
        },
        events: {
            scrollTo: function(idx){
                if(idx != this.idx)
                    this.scrollTo(idx)
            }
        },
        methods: {
            autoPlay: function(time){
                var _this = this;
                this.frameCnt = 0;
                function renderFrame() {
                    if(_this.easing){
                        _this.frameCnt++
                        if(_this.frameCnt == 60 * 5){
                            _this.frameCnt = 0;
                            _this.next();
                        }
                    }
                    requestAnimationFrame(renderFrame)
                }
                requestAnimationFrame(renderFrame)
            },
            prev: function(){
                if(!!this.options.loop)
                    this.idx = (this.idx == -1) ? this.length-1 : this.idx-1;
                else
                    this.idx = (this.idx == 0) ? this.idx : this.idx-1;
                this.scrollTo(this.idx);
            },
            next: function(){
                if(!!this.options.loop)
                   this.idx = (this.idx == this.length) ? 0 : this.idx+1;
                else
                   this.idx = (this.idx == this.pageCount-1) ? this.idx : this.idx+1;
                this.scrollTo(this.idx);
            },
            scrollTo: function(idx){
                var self = this
                this.animating = true;
                this.idx = idx;
                var initPos = this.translateX
                var targetPos = -this.wrapperWidth/this.options.perSliders*Math.floor(this.options.perSliders)*idx;
                var delta = Math.floor((targetPos - initPos))
                if(!self.options.loop && self.idx == self.pageCount-1 && self.pageCount>1){
                    self.translateX = -self.listWidth+self.wrapperWidth
                }else
                   self.translateX += delta;
                if(Math.abs(self.translateX - targetPos) > 6){
                    //requestAnimationFrame(renderFrame)
                }else
                    self.translateX = targetPos
                this.$dispatch('scrollTo',idx);
            },
            touchStart: function(e){
                if(this.animating){
                    this.transitionEnd()
                }

                this.delta = 0;
                this.easing = false
                this.curPos = e.touches[0].pageX;
                this.lastPos = this.curPos;
                this.startPos = this.curPos;

                this.curPosY = e.touches[0].pageY;
                this.lastPosY = this.curPosY;

                this.firstFrame = true;
               // if(this.options.loop && this.animating)return;
                this.animating = false;
                if(this.idx == this.length){
                    this.idx = 0;
                    //this.scrollTo(this.idx);
                }else if(this.idx == -1){
                    this.idx = this.length-1;
                    this.scrollTo(this.idx);
                }
                if(this.allowVerticalScroll){
                    if(window.screen.availHeight >= document.body.getBoundingClientRect().bottom){
                        this.atBottom = true
                    }else{
                        this.atBottom = false
                    }
                }
            },
            touchMove: function(e){
                //if(this.options.loop && this.animating)return;
                if(this.list.length==1)return;
                this.animating = false;
                this.easing = false;
                this.curPos = e.touches[0].pageX;
                this.delta =  this.curPos - this.lastPos;
                this.lastPos = this.curPos;
                this.curPosY = e.touches[0].pageY;
                this.deltaY =  this.curPosY - this.lastPosY;
                this.lastPosY = this.curPosY;
                if(this.firstFrame){
                    if(!this.delta || !this.deltaY){
                        e.preventDefault();
                    }
                    if(Math.abs(this.delta)*0.5 > Math.abs(this.deltaY)){
                        this.scroll = true;
                        e.preventDefault();
                        this.disableScreenScroll = true;
                    }else{
                        this.scroll = false;
                        if(this.deltaY < 0){
                            this.computeVerticalScroll = true
                        }else{
                            this.computeVerticalScroll = false
                        }
                        this.disableScreenScroll = false;
                    }
                }
                if(this.scroll){
                    if(this.translateX>0){
                        this.translateX += this.delta/2;
                    }else if(this.translateX < -(this.listWidth - this.wrapperWidth) ){
                        this.translateX += this.delta/2;
                    }else{
                        this.translateX += this.delta;
                    }
                    this.endPos = this.curPos;
                }else if(this.atBottom && this.computeVerticalScroll && this.allowVerticalScroll){
                    e.preventDefault();
                    this.translateY += this.deltaY/2;
                    if(this.btmToNextLimit > Math.abs(this.translateY)){
                        this.$dispatch('isBtmToNextOk',false)
                    }else{
                        this.$dispatch('isBtmToNextOk',true)
                    }
                }
                this.firstFrame = false;
            },
            touchEnd: function(e){
                this.disableScreenScroll = false;
               // if(this.options.loop && this.animating)return;
                this.easing = true;
                if(!this.scroll && this.atBottom && this.allowVerticalScroll){
                    this.atBottom = false
                    if(this.btmToNextLimit < Math.abs(this.translateY) && (this.translateY<0) ){
                        this.$dispatch('btmToNext')
                    }
                    this.translateY = 0
                }
                if(!this.scroll){
                    return
                }
                if(Math.abs(this.delta) == 0){
                    this.scrollTo(this.idx)
                    return
                }
                var delta = this.endPos - this.startPos;
                if(delta<-.1*this.wrapperWidth)
                    this.next();
                else if(delta>.1*this.wrapperWidth)
                    this.prev();
                else{
                    this.scrollTo(this.idx)
                }
            },
            transitionEnd: function(){
                this.frameCnt = 0
                //TOREMOVE
                //window.dispatchEvent(this.scrollEvent)
                if(this.idx == this.length){
                    this.easing = false;
                    this.idx = 0;
                    this.scrollTo(this.idx);
                    var _this = this;
                    setTimeout(function(){
                        _this.easing = true;
                        _this.animating = false;
                    },50);
                }else if(this.idx == -1){
                    this.easing = false;
                    this.idx = this.length-1;
                    this.scrollTo(this.idx);
                    var _this = this;
                    setTimeout(function(){
                        _this.easing = true;
                        _this.animating = false;
                    },50);
                }else{
                    this.animating = false;
                }
            }
        }
    }
</script>
<style lang='less'>
    @import '../../core/less/var.less';
    @import '../../core/less/layout.less';
    .swiper-container {
        overflow: hidden;
        position: relative;
        .swiper {
            display: -webkit-box;
            display: -moz-box;
            position: relative;
            li {
                position: relative;
                height: 100%;
                div {
                    width: 100%;
                }
            }
        }
    }
</style>
