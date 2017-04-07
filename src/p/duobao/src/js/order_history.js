require([
    'widgets.pdlist.result',
    'config',
    'docode',
    'components',
    'fastclick',
    'queryparser',
    ],
function(
      ProductList
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

    $g.ready().then(function(){
        new ProductList({
            el: '#wrapper',
            data: {
                sourceData: sourceData
            }
        })
        $g.setTitle('用户参与记录')
    })
    //调用埋码
    var maima = {
        "pageName": "国美金融:一元夺宝:用户参与记录",
        "channel": "国美金融",
        "prop1": "国美金融:一元夺宝",
        "prop2": "国美金融:一元夺宝:用户参与记录",
        "prop3": "国美金融:一元夺宝:用户参与记录",
        "prop4": "国美金融:一元夺宝:用户参与记录",
        "prop6": "一元夺宝",
        "prop27": sourceData.prePageName ,
    }
    navigator.gome.util.nativeUtils.getMeasure(maima);;
    
})

