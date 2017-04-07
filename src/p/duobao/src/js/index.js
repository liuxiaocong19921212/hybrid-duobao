require([
    'config',
    'widgets.shortcut',
    'widgets.carousel',
    'widgets.pdlist.double',
    'widgets.order.dialog',
    'docode',
    'components',
    'fastclick',
    'queryparser'
    ],
function(
      Config
    , Shortcut
    , Carousel
    , ProductDouble
    , Dialog
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
    var dialog = new Dialog({
        data: {
            data: {},
            userNo: {}
        }
    }).$mount().$appendTo('body')
    function init(result){
        var b = new ProductDouble({
            el: '#productDouble',
            data: {
                data: result,
                dialog: dialog
            }
        })
    }

    // 设置首焦图默认宽高比
    var _width = Number(document.documentElement.offsetWidth);
    _width = _width < 640 ? _width : 640;
    var _height;
    _height = (147/414)*_width;
    document.getElementById('carousel').style.height = _height + 'px';
    $g.ready()
    .then(function(){
        var key = 'channelDCYpES5pt9x'
         Docode.request(function(data){
             data = typeof data === 'string' ? JSON.parse(data[""]) : data
             var result = data.encReqInfo
             init(result)
         },new Function, {            
             "systemNo": Config.systemNo,
             "version": Config.version,
             "reqType":"P1000000001",
         })
        var focusList;
        var isTimeout = true
        var sendRequest = function (ok,fail){            
            var script = document.createElement('script');
            window.jsonpcallback=function(data){
                isTimeout = false;
                data = typeof data == 'string' ? JSON.parse(data):data
                focusList = data.templetList[0].focusPhotoListTemplet;
                focusList.forEach(function(item){
                    item.imgPath = item.imageUrl
                    item.href = item.promsUrl
                })
                new Carousel({
                    el: '#carousel',
                    data:{
                        data: focusList,
                        options: {
                            'autoPlay': true,
                            'loop': true,
                            'perSliders': 1,
                            'pagination': true,
                            'wrapperWidth': document.body.offsetWidth,
                        },
                        pageType: 'default'
                    }
                })
            }
            script.src=Config.cmsHost + '/mobile/promotion/promscms/promscms.jsp?bust=' + (new Date()).getTime() +'&body={"keyProms":"channelDCYpES5pt9x"}' + '&callback=jsonpcallback' 
            document.body.appendChild(script);
        }
        sendRequest();
        setTimeout(function(){
            if(isTimeout){
                var el = document.querySelector('#carousel')
                if(el){
                    el.style.display = 'none'
                }
            }
        }, 3000)
    })
    new Shortcut({
        el: '#shortcut',
        data: {
            data: [
                    {'menuName':'幸运榜单','imgPath': window.RESOURCE+'p/duobao/src/images/menuImg_rank.png',"href":Config.jrHost + '/hybrid/duobao/lucky_list.html?prePageName=夺宝首页'},
                    {'menuName':'夺宝指南','imgPath': window.RESOURCE+'p/duobao/src/images/menuImg_zn.png',"href":Config.jrHost + '/hybrid/duobao/guide.html?prePageName=夺宝首页'},
                    {'menuName':'我的夺宝','imgPath': window.RESOURCE+'p/duobao/src/images/menuImg_my.png',"href":Config.jrHost + '/hybrid/duobao/my.html?prePageName=夺宝首页'}
                ]
        }
    })
    var sourceData = {};
    if(window.location.search){
        sourceData = QueryParser.parse(window.location.search)
    }
    $g.ready()
        .then(function(){
            $g.setTitle('一元夺宝')
        })
    //调用埋码
    var maima = {
        "pageName": "国美金融:一元夺宝",
        "channel": "国美金融",
        "prop1": "国美金融:一元夺宝",
        "prop2": "国美金融:一元夺宝:首页",
        "prop3": "国美金融:一元夺宝:首页",
        "prop4": "国美金融:首页",
        "prop6": "国美金融理财产品首页",
        "events": "prodView,event3",
        "prop27": sourceData.prePageName 
    }
    navigator.gome.util.nativeUtils.getMeasure(maima);;
})