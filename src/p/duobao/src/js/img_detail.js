require([
    'config',
    'widgets.detail.img',
    'docode',
    'components',
    'fastclick',
    'queryparser'
    ],
function(
      Config
    , DetailImg
    , Docode
    , Components
    , FastClick
    , QueryParser){
    //polyfill
    FastClick.attach(document.body);
    window.requestAnimationFrame=(function(){
      return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
    }());
    //gotop
    new Vue({
        el: '#gotop',
        components: {
            'gotop': Components.Gotop.Solid
        }
    })
    function init(result){
        new DetailImg({
            el: '#detailImgList',
            data: {
                data: result
            }
        })
    }
    $g.ready().then(function(){
        var sourceData = QueryParser.parse(window.location.search)
        Docode.request(function(data){
            data = typeof data === 'string' ? JSON.parse(data) : data
            var result = data.encReqInfo
            init(result);
        }, function(){
        }, {
            "systemNo": Config.systemNo,
            "version": Config.version,
            "reqType":"P1000000005",
            'packageNo': sourceData.packageNo
        })   
        
        $g.setTitle('图文详情')
        //调用埋码
        var maima = {
            "pageName": "国美金融:一元夺宝:图文详情页",
            "channel": "国美金融",
            "prop1": "国美金融:一元夺宝",
            "prop2": "国美金融:一元夺宝:图文详情页",
            "prop3": "国美金融:一元夺宝:图文详情页",
            "prop4": "国美金融:一元夺宝:图文详情页",
            "prop6": "一元夺宝",
            "prop27": sourceData.prePageName ,
        }
        navigator.gome.util.nativeUtils.getMeasure(maima);;  
    })  
})