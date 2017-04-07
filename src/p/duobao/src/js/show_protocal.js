require([
        'config',
        'docode',
        'components',
        'fastclick',
        'queryparser',
    ],
    function(
         Config
        , Docode
        , Components
        , FastClick
        , QueryParser){
        //polyfill
        FastClick.attach(document.body);
        window.requestAnimationFrame=(function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
        }());
        $g.ready()
        .then(function(){
            $g.setTitle('国美在线一元夺宝服务协议')
            var sourceData = {};
                if(window.location.search){
                    sourceData = QueryParser.parse(window.location.search)
                }
            //调用埋码
            var maima = {
                "pageName": "国美金融:一元夺宝:一元夺宝服务协议页",
                "channel": "国美金融",
                "prop1": "国美金融:一元夺宝",
                "prop2": "国美金融:一元夺宝:一元夺宝服务协议页",
                "prop3": "国美金融:一元夺宝:一元夺宝服务协议页",
                "prop4": "国美金融:一元夺宝:一元夺宝服务协议页",
                "prop6": "一元夺宝",
                "prop27": sourceData.prePageName ,
            }
            navigator.gome.util.nativeUtils.getMeasure(maima);;
            
        })
})