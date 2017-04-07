require([
        'widgets.number.rule',
        'widgets.compute.rule',
        'config',
        'docode',
        'components',
        'fastclick',
        'queryparser',
    ],
    function(
         computeRule
        ,numberRule
        , Config
        , Docode
        , Components
        , FastClick
        , QueryParser){
        //polyfill
        FastClick.attach(document.body);
        window.requestAnimationFrame=(function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
        }());

        new Vue({
            el: '#gotop',
            components: {
                'gotop': Components.Gotop.Solid
            }
        })



        var sourceData = QueryParser.parse(window.location.search)
        var init = function(data){
            new numberRule({
                el: '#compute',
                data: {
                    data:data
                }
            })
        }

        $g.ready().then(function () {
            new computeRule({
                el: '#number',
                data: {
                    sourceData: sourceData
                }
            })
            Docode.request(function(data){
                data = typeof data === 'string' ? JSON.parse(data) : data
                var result = data.encReqInfo
                init(result)
            }, function(data){
                console.log('fail')
            }, {
                "isPostBody": 'Y',
                'systemNo': Config.systemNo,
                'version': Config.version,
                'reqType': 'P1000000006',
                'userNo': sourceData.userNo,
                'packageNo': sourceData.packageNo
            })

            $g.setTitle('计算规则')
            
            //调用埋码
            var maima = {
                "pageName": "国美金融:一元夺宝:计算规则",
                "channel": "国美金融",
                "prop1": "国美金融:一元夺宝",
                "prop2": "国美金融:一元夺宝:计算规则",
                "prop3": "国美金融:一元夺宝:计算规则",
                "prop4": "国美金融:一元夺宝:计算规则",
                "prop6": "一元夺宝",
                "prop27": sourceData.prePageName ,
            }
            navigator.gome.util.nativeUtils.getMeasure(maima);;
        })
    })

