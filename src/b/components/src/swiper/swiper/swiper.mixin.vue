/**
 * swiper的基类
 * @Author: zhaoye-ds1
 * @Created-Date: 2015/12
 * @Last-Modefied-Date: 2015/11/01
 * @Last-Modefied-By: zhaoye
 */
<script>
    export default ({
        data: function(){
            return {
                //translateX的值
                translateX: 0,
                //translateY的值
                translateY: 0,
                //上一帧X的位置
                lastX: 0,
                //上一帧Y的位置
                lastY: 0,
                //当前帧X的位置
                curX: 0,
                //当前帧Y的位置
                curY: 0,
                //每帧X的变动
                delta: 0,
                //每帧Y的变动
                deltaY: 0,
                //是否正在缓动
                easing: false,
                //最后5帧X方向的变化
                lastDeltaList:[],
                scrolling: false,
                isFirstFrame: false,
                scrollEvent: 'undefined',
            }
        },
        computed: {
            wrapperWidth: function(){
                if(this.options.wrapperWidth)return this.options.wrapperWidth
                if(this.$el){
                    return this.$el.offsetWidth
                }else{
                    return 0
                }
                //容器宽度
                //return this.options ? this.options.wrapperWidth || document.body.offsetWidth : document.body.offsetWidth;
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
        methods: {
            initSwiper: function(){
                this.scrollEvent = document.createEvent('HTMLEvents')
                this.scrollEvent.initEvent('scroll',true,false)
                this.scrollEvent.eventType = 'message'

                var lastX = 0
                var diff = 0
                this.$watch('translateX',function(val){
                    // watch偏移属性的变化派发事件，通知图片懒加载
                    if(val != lastX){
                        lastX = val
                        diff++
                        if(diff == 5){
                           window.dispatchEvent(this.scrollEvent)
                           diff = 0
                        }
                    }
                })
            },
            touchstart: function(e){
                //关闭缓动
                this.easing = false
                //记录当前位置
                this.curX = e.touches[0].pageX
                this.curY = e.touches[0].pageY
                this.lastX = this.curX
                this.lastY = this.curY
                //清空列表
                this.lastDeltaList = []
                this.$emit('scrollStart')
                this.isFirstFrame = true;
            },
            touchmove: function(e){
                //记录每一帧的位置
                this.curX = e.touches[0].pageX
                this.curY = e.touches[0].pageY
                //计算偏移
                this.delta = this.curX - this.lastX
                this.deltaY = this.curY - this.lastY

                if(this.lastDeltaList.length==5)
                    this.lastDeltaList.shift()
                this.lastDeltaList.push(this.delta)

                if(this.isFirstFrame){
                    if(Math.abs(this.delta) > Math.abs(this.deltaY)*2){
                        this.scrolling = false
                    }else{
                        this.scrolling = true
                    }
                }
                this.isFirstFrame = false
                if(!this.scrolling){
                    e.preventDefault()
                    this.$emit('scroll',e)
                }
                //保存最后一帧位置
                this.lastX = this.curX;
                this.lastY = this.curY;
            },
            touchend: function(e){
                if(this.scrolling)return
                //开启缓动
                this.easing = true
                var sum = 0
                this.lastDeltaList.forEach(function(delta){
                    sum += delta
                })
                //计算最后5帧平均值
                var average = sum / this.lastDeltaList.length
                //惯性滑动
                if(average)
                    this.translateX += average*5
                this.$emit('scrollEnd',e)
            },
            transitionEnd: function(e){
                //关闭缓动
                this.easing = false
                window.dispatchEvent(this.scrollEvent)
            }
        },
        compiled: function(){
            var _this = this;
            this.$el.addEventListener('webkitTransitionEnd',function(){
                _this.transitionEnd()
            })
            this.$el.addEventListener('mozTransitionEnd',function(){
                _this.transitionEnd()
            })
        }
    })
</script>
