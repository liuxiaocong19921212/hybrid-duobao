require([
    'config',
    'widgets.order.address',
    'docode',
    'components',
    'fastclick',
    'queryparser'
    ],
function(
      Config
    , Address
    , Docode
    , Components
    , FastClick
    , QueryParser){
    //polyfill
    FastClick.attach(document.body);
    window.requestAnimationFrame=(function(){
        return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
    }());
    var login ;
    function isLogin(flag){
        if(flag == 'Y')
            login = true
        else
            login = false
    }
    function init(aboutPd){
        new Address({
            el:'#shaddress',
            data:{
                // data:aboutPd
                pdInfo:aboutPd,
            }
        })
    };
    $g.ready().then(function(){
        
        var sourceData = QueryParser.parse(window.location.search)
        //判断是否登录
        navigator.gome.util.nativeUtils.isLogin(function(result){
            var result = JSON.parse(result);
            isLogin(result.isLogin);
            var request = function(data){
                if(data){
                    data = typeof data === 'string' ? JSON.parse(data) : data
                    sourceData.userNo = data.profileId  
                }
                Docode.request(function(data){
                    data = typeof data === 'string' ? JSON.parse(data) : data
                    var result = data.encReqInfo
                    // console.log(Docode.decode(data.encReqInfo))
                    init(result)
                },function(data){
                }, {
                    "systemNo": Config.systemNo,
                    "version": Config.version,
                    "reqType":"P1000000003",
                    'packageNo': sourceData.packageNo,
                    "userNo": sourceData.userNo
                    
                })   
            }
            //如果登录则去获取用户信息
            if(login){
                // navigator.gome.util.nativeUtils.getUserInfo(request)
                $g.getUserInfo().then(request)
            }else{
                request()
            }
        })
    })    
})
