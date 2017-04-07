require([
        'widgets.pdlist.luck',
        'config',
        'docode',
        'components',
        'fastclick',
        'queryparser',
    ],
    function(
          luckRank
        , Config
        , Docode
        , Components
        , FastClick
        , QueryParser){
        //polyfill
        FastClick.attach(document.body);
        

        new Vue({
            el: '#gotop',
            components: {
                'gotop': Components.Gotop.Solid
            }
        })

        var sourceData = QueryParser.parse(window.location.search)
        $g.ready()
        .then(function(){
            new luckRank({
                el: '#luckrank',
                data: {
                    sourceData: sourceData
                }
            })

            $g.setTitle('幸运榜单')
        })
        //调用埋码
        var maima = {
            "pageName": "国美金融:一元夺宝:幸运榜单",
            "channel": "国美金融",
            "prop1": "国美金融:一元夺宝",
            "prop2": "国美金融:一元夺宝:幸运榜单",
            "prop3": "国美金融:一元夺宝:幸运榜单",
            "prop4": "国美金融:一元夺宝:幸运榜单",
            "prop6": "一元夺宝",
            "prop27": sourceData.prePageName
        }
        navigator.gome.util.nativeUtils.getMeasure(maima);;

})
