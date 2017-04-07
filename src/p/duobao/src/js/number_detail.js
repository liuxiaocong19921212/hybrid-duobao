require([
        'widgets.detail.number',
        'config',
        'docode',
        'queryparser',
        'components',
        'fastclick',
    ],
    function(
          numberDetail
        , Config
        , Docode
        , QueryParser
        , Components
        , FastClick){
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
        var start = function(){
            Docode.request(function(data){
                data = typeof data === 'string' ? JSON.parse(data) : data
                new numberDetail({
                    el: '#numberdetail',
                    data: {
                        data: data.encReqInfo,
                        sourceData: sourceData,
                        isFromMyself: sourceData.from == 'me' ? true : false
                    }
                })
            }, function(){
                console.log('fail')
            }, {
                'systemNo': Config.systemNo,
                'version': Config.version,
                'reqType': 'P1000000007',
                'orderLoginIn': sourceData.loginId,
                'packageNo': sourceData.packageNo,
                'orderNo': sourceData.orderNo || "",
                'orderUserNo': sourceData.from == 'me' || 'prize' ? sourceData.userNo : '',
                'curPage': '1',
                'pageSize':'100'
            })
        }
        $g.ready().then(function() {
            navigator.gome.util.nativeUtils.showTitle('夺宝号码详情')
            if(sourceData.from && sourceData.from == 'me'){
                // navigator.gome.util.nativeUtils.isLogin(function(data){
                //     data = typeof data == 'string' ? JSON.parse(data) : data
                //     if(data.isLogin == 'Y'){
                //         start()
                //     }else{
                //         navigator.gome.app.nativeLogin.jumpToNativeLogin(function(){
                //             start()
                //         })
                //     }
                // })
                $g.getUserInfo().then(function(data){
                    if(data){
                        start()
                    }
                }).catch(function(){

                })
            }else{
                start()
            }

            $g.setTitle('夺宝号码详情')
        })
        //调用埋码
        var maima = {
            "pageName": "国美金融:一元夺宝:夺宝号码详情",
            "channel": "国美金融",
            "prop1": "国美金融:一元夺宝",
            "prop2": "国美金融:一元夺宝:夺宝号码详情",
            "prop3": "国美金融:一元夺宝:夺宝号码详情",
            "prop4": "国美金融:一元夺宝:夺宝号码详情",
            "prop6": "一元夺宝",
            "prop27": sourceData.prePageName ,
        }
        navigator.gome.util.nativeUtils.getMeasure(maima);;
    })
