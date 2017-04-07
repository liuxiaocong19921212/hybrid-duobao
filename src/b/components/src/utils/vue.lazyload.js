/**
 *
 */
if(Vue){
    (function(){
        var cntr = 0
        var lastCntr = 0
        var diff = 0
        var scrollEnd = document.createEvent('HTMLEvents');
        scrollEnd.initEvent('scrollEnd')
        scrollEnd.eventType = 'message'
        function enterFrame(){
            if(cntr != lastCntr){
                diff++
                if(diff == 5){
                    window.dispatchEvent(scrollEnd)
                    cntr = lastCntr
                }
            }
            requestAnimationFrame(enterFrame);
        }
        window.requestAnimationFrame(enterFrame)
        window.addEventListener('scroll',function(){
            lastCntr = cntr
            diff = 0
            cntr++
        })
    })()
    Vue.lazyload = {
        opt:{
            'product':{
                matches:[
                {
                    'range': {
                        'start': 0,
                        'end': 320,
                    },
                    'resolution': '_260',
                },
                {
                    'range': {
                        'start': 320,
                        'end': 414,
                    },
                    'resolution': '_360',
                },
                {
                    'range': {
                        'start': 414,
                        'end': Number.MAX_VALUE
                    },
                    'resolution': '_400'
                }],
                rule:{
                    'regex': /(_\d+)\.(bmp|jpg|jpeg|gif|png|webp)$/,
                    'pos': '$1',
                }
            }
        }
    };
    Vue.lazyload.install = function(Vue,options){
        var lastPos = document.body.getBoundingClientRect().top
        var lastSpeeds = []
        var aveSpeed = 0
        function getSpeed(){
            var curPos = document.body.getBoundingClientRect().top
            var speed = lastPos - curPos
            if(lastSpeeds.length<10){
                lastSpeeds.push(speed)
            }else{
                lastSpeeds.shift()
                lastSpeeds.push(speed)
            }
            var sumSpeed = 0
            lastSpeeds.forEach(function(speed){
                sumSpeed += speed
            })
            aveSpeed = Math.abs(sumSpeed/lastSpeeds.length)
            lastPos = curPos
        }
        window.addEventListener('scroll',function(){
            getSpeed()
        })
        Vue.directive('lazyload',function(value){
                if(!this.el)return
                var _this = this;
                _this.el.style.opacity = 0;
                if(!this.el.src){
                    if(this.arg != 'rect')
                        this.el.src =  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                    else
                        this.el.src = 'data:image/gif;base64,R0lGODlhAwABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5ODc5MkU1OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5ODc5MkU2OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk4NzkyRTM5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTk4NzkyRTQ5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAAwABAAACAoQLADs='
                }
                var compute = function(){
                    if(!_this.el){
                        window.removeEventListener('scrollEnd',compute)
                        window.removeEventListener('scroll',computeBySpeed)
                        return;
                    }
                    var rect = _this.el.getBoundingClientRect();
                    if(_this.arg == 'nohori'){
                        if(rect.bottom >=0 && rect.top <= window.screen.height){
                            //_this.el.style.opacity = 0
                            repSrc(_this.el,value)
                            _this.el.addEventListener('load',onloadEnd)
                            window.removeEventListener('scrollEnd',compute)
                            window.removeEventListener('scroll',computeBySpeed)
                            lastSpeeds = []
                        }
                    }else{
                        if(rect.bottom >=0 && rect.top <= window.screen.height
                            && rect.right >0 && rect.left < window.screen.width){
                            if(_this.el.src != value && !!value){
                                //_this.el.style.opacity = 0
                                repSrc(_this.el,value)
                                _this.el.addEventListener('load',onloadEnd)
                                window.removeEventListener('scrollEnd',compute)
                                window.removeEventListener('scroll',computeBySpeed)
                                lastSpeeds = []
                            }
                        }
                    }
                }
                var repSrc = function(el,url){
                    if(this.arg == 'adapter' && options){
                        if(this.modifiers){
                            var key
                            for(var k in this.modifiers){
                                key = k
                            }
                            var adapter
                            for(var k in options){
                                if(k == key){
                                    adapter = options[key]
                                }
                            }
                            if(adapter){
                                var rule = adapter.rule
                                adapter.matches.forEach(function(match){
                                    var clientWidth = document.body.clientWidth
                                    if(clientWidth > match.range.start && clientWidth <= match.range.end){
                                        if(rule.regex.test(url)){
                                            var repStr = url.match(rule.regex)[0]
                                            var tempStr = repStr.replace(RegExp[rule.pos],rule.prefix ? rule.prefiex+match.resolution : match.resolution)
                                            url = url.replace(repStr,tempStr)
                                            
                                        }
                                    }
                                })
                            }
                        }
                    }
                    /*if(url.match(/gfs/) || window.navigator.userAgent.match(/Android/)){
                        if(url.match(/\.(jpg|jpeg|bmp|gif)/)){
                            url = url.replace(/\.(jpg|jpeg|bmp|gif)/,'.webp')
                        }else{
                            url = url+'.webp'
                        }
                    }*/
                    el.src = url
                }.bind(this)
                var computeBySpeed = function(){
                    if(aveSpeed>10)return
                    compute()
                }
                var onload = function(){
                    compute();
                    if(_this.el){
                        _this.el.removeEventListener('load',onload)
                    }
                    window.addEventListener('scrollEnd',compute)
                    window.addEventListener('scroll',computeBySpeed)
                }
                var onloadEnd = function(){
                    if(!_this.el){
                        window.removeEventListener('scrollEnd',compute)
                        window.removeEventListener('scroll',computeBySpeed)
                        return;
                    }
                    _this.el.style.opacity = 1;
                    _this.el.style.transition = 'opacity .3s';

                    _this.el.removeEventListener('load',onloadEnd)
                    _this.el.removeEventListener('load',onload)
                    window.removeEventListener('scrollEnd',compute)
                    window.removeEventListener('scroll',computeBySpeed)
                }
                _this.el.addEventListener('load',onload)
        })
    }
}
