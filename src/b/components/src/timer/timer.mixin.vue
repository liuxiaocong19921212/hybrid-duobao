<script>
export default ({
    props:['timeStart','timeEnd','timeLeft'],
    data: function(){
        return {
            timeLeft:0,
            day: 0,
            hour: 0,
            minitue: 0,
            second: 0,
            interval: null,
        }
    },
    created: function(){
        if(this.timeLeft){
            this.startTime = Number(new Date().getTime())
            this.timeEnd = Number(this.startTime) + Number(this.timeLeft)
        }
        if(this.timeStart){
            this.start(this.timeStart,true);
        }else{
            this.$watch('timeStart',this.start)
        }
        if(this.timeEnd){
            this.start(this.timeEnd)
        }else{
            this.$watch('timeEnd',this.start)
        }
    },
    methods: {
        start:function(val,start){
            this.timeLeft = val;
            var _scope = this,
                now = this.startTime ? new Date(this.startTime) : new Date(),
                end = new Date(this.timeEnd),
                delta = end.getTime() - now.getTime();
            if(delta>0){
                if(!start){
                    this.counter(true)
                    this.interval = setInterval(function(){
                        _scope.counter.call(_scope)
                    },1000)
                }else{
                    /*
                     * 因setTimeout最大值限制，并且用户也不可能停留页面24小时以上.
                     *  24小时 = 86400000
                     */
                    if(delta<=86400000){
                        setTimeout(function(){
                            _scope.$dispatch('timerStart');
                            _scope.$emit('timerStart');
                        },delta);
                    }
                }
            }
        },
        counter: function(isInit){
            function singleToDouble(val){
                if(val < 10){
                    val = '0'+val
                }
                return val
            }
            if(Number(this.timeLeft) != 0){
                var end = new Date(this.timeEnd)
                var now = new Date()
                var delta = end.getTime() - now.getTime()
                this.day = Math.floor(delta/1000/60/60/24)
                if(this.day > 3){
                    this.day = 3
                }
                this.hour = Math.floor(delta/1000/60/60%24)
                this.minitue = Math.floor(delta/1000/60%60)
                this.second = Math.floor(delta/1000%60)
                if(this.hour <= 0 && this.minitue <= 0 && this.second <= 0 && this.day < 1){
                    clearInterval(this.interval)
                    //Vue2.0去掉了组件事件树
                    if(window.Vue.version.match(/^1/)){
                        this.$dispatch('timerEnd')
                    }
                    this.$emit('timerEnd')
                }
                this.hour = singleToDouble(this.hour)
                this.minitue = singleToDouble(this.minitue)
                this.second = singleToDouble(this.second)
            }
        }
    }
})
</script>
