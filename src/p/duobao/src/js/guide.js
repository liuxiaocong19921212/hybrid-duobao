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

        new Vue({
            el: '#gotop',
            components: {
                'gotop': Components.Gotop.Solid
            }
        })
        $g.ready().then(function(){
            $g.setTitle('夺宝指南')  
            var sourceData = {};
            if(window.location.search){
                sourceData = $g.query.parse()
            }
            //调用埋码
            var maima = {
                "pageName": "国美金融:一元夺宝:夺宝指南",
                "channel": "国美金融",
                "prop1": "国美金融:一元夺宝",
                "prop2": "国美金融:一元夺宝:夺宝指南",
                "prop3": "国美金融:一元夺宝:夺宝指南",
                "prop4": "国美金融:一元夺宝:夺宝指南",
                "prop6": "一元夺宝",
                "prop27": sourceData.prePageName ,
            }
            navigator.gome.util.nativeUtils.getMeasure(maima);;
        })
})