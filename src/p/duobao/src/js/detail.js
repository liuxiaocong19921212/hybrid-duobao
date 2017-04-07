require([
    'config',
    'widgets.carousel',
    'widgets.detail.info',
    'widgets.detail.nav',
    'widgets.detail.joinList',
    'widgets.detail.btmNav',
    'docode',
    'components',
    'fastclick',
    'queryparser'
    ],
function(
      Config
    , Carousel
    , DetailInfo
    , DetailList
    , joinList
    , BtmNav
    , Docode
    , Components
    , FastClick
    , QueryParser){
    //polyfill
    FastClick.attach(document.body);
    window.requestAnimationFrame=(function(){
      return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
    }());

    var sourceData = QueryParser.parse(window.location.search)

    var login
    function isLogin(flag){
        if(flag == 'Y')
            login = true
        else
            login = false
    }

    var carousel
    var detailInfo
    var detailList
    var joinList
    var btnNav

    /**
     * 初始化所有模组
     * @param  {json} data       后台返回的数据
     * @param  {string} from     标记有没有登录
     * @param  {map} sourceData  url里的get请求参数
     */
    function init(data,from,sourceData){ 
        //分享
        navigator.gome.util.nativeUtils.shareLink({
            'shareDesc': data.shareInfo.content,
            'shareUrl': Config.jrHost + '/hybrid/duobao/detail.html?packageNo=' + data.packageInfo.packageNo,
            'shareImageUrl':  data.packageInfo.imgPath || 'https://img.gomein.net.cn/mobile/cms/prom/images/gomelogo.png',
            'title': data.shareInfo.title
        })
        //详情页swiper
        if(data.imgPathList && data.imgPathList.length>0){
            carousel = new Carousel({
                el: '#carousel',
                data:{
                    data: data.imgPathList,
                    options: {
                        'autoPlay': false,
                        'loop': true,
                        'perSliders': 1,
                        'pagination': false,
                        'wrapperWidth': document.body.offsetWidth,
                        'height': document.body.offsetWidth + 'px'
                    },
                    custom: 'my_pagination',
                    pageType: 'hide'
                }
            })
        }
        //deta
        detailInfo = new DetailInfo({
            el:'#detailBox',
            data:{
                data: data,
                isFrom: from,
                resultHref: Config.jrHost + '/hybrid/duobao/luck_rank.html?packageNo='+data.packageInfo.packageNo+'&prePageName=国美金融:一元夺宝:详情页',
                computeRule:Config.jrHost + '/hybrid/duobao/rule.html?packageNo='+data.packageInfo.packageNo+'&userNo=' + sourceData.userNo +'&prePageName=国美金融:一元夺宝:详情页'
            }
        })
        detailList = new DetailList({
            el:'#menuList',
            data:{
                data:[
                    {'desc':'图文详情','url': Config.jrHost+'/hybrid/duobao/img_detail.html?packageNo='+data.packageInfo.packageNo+'&prePageName=国美金融:一元夺宝:详情页'},
                    {
                        'desc':'我的夺宝号码',
                        'state':'true',
                        'url': Config.jrHost + '/hybrid/duobao/number_detail.html' + QueryParser.queryify({
                                loginId: data.packageInfo.lotteryInfo.loginId || sourceData.loginId,
                                userNo: data.packageInfo.lotteryInfo.userNo || sourceData.userNo,
                                from: 'me',
                                packageNo: data.packageInfo.packageNo,
                                prePageName: '详情页'
                        }),
                        'joinTimes':data.packageInfo.buyLotteryTimes
                    },
                    {'desc':'夺宝指南','url': Config.jrHost + '/hybrid/duobao/guide.html'+'?prePageName=国美金融:一元夺宝:详情页'}
                    ],
            }
        })
        joinList = new joinList({
            el:'#joinList',
            data:{
                data:data.orderInfoList,
                isFrom: from,
                href: Config.jrHost + '/hybrid/duobao/order_history.html?packageNo='+data.packageInfo.packageNo+'&prePageName=国美金融:一元夺宝:详情页'
            }
        })
        btnNav = new BtmNav({
            el:'#btmNav',
            data:{
                data:data.packageInfo,
                next: Config.jrHost + '/hybrid/duobao/detail.html?packageNo='+data.packageInfo.nextPackageNo+'&prePageName=国美金融:一元夺宝:详情页'
            }
        })

        //调用埋码
        var maima = {
            "pageName": "国美金融:一元夺宝:"+sourceData.packageShowNm,
            "channel": "国美金融",
            "prop1": "国美金融:一元夺宝",
            "prop2": "国美金融:一元夺宝:商品",
            "prop3": "国美金融:一元夺宝:"+sourceData.packageShowNm,
            "prop4": "国美金融:商品",
            "prop6": "国美金融理财产品详情页",
            "events": "prodView,event3",
            "prop27": sourceData.prePageName ,
            "products": ";一元夺宝;;;;eVar50=一元夺宝"
        }
        navigator.gome.util.nativeUtils.getMeasure(maima);;
    }
    /**
     * 初始化所有模组
     * @param  {json} data       后台返回的数据
     * @param  {string} from     标记有没有登录
     * @param  {map} sourceData  url里的get请求参数
     */
    var request = function(data,isReload){
        if(data){
            data = typeof data === 'string' ? JSON.parse(data) : data
            sourceData.userNo = window.userNo = data.profileId  
            sourceData.loginId = window.loginId = data.userName || data.loginName 
        }
        Docode.request(function(data){
            data = typeof data === 'string' ? JSON.parse(data) : data
            if(data.isSuccess == 'N'){
                requestError()
                return
            }
            var result = data.encReqInfo
            var from
            sourceData.packageShowNm = result.packageInfo.packageShowNm
            if(sourceData.userNo == result.packageInfo.lotteryInfo.userNo){
                from = 'me';
            }
            if(isReload){
                //更新状态
                detailInfo.data = result
                detailInfo.isFrom = from
                
                detailList.data = [
                    {'desc':'图文详情','url': Config.jrHost+'/hybrid/duobao/img_detail.html?packageNo='+result.packageInfo.packageNo+'&prePageName=国美金融:一元夺宝:详情页'},
                    {
                        'desc':'我的夺宝号码',
                        'state':'true',
                        'url': Config.jrHost + '/hybrid/duobao/number_detail.html' + QueryParser.queryify({
                                loginId: result.packageInfo.lotteryInfo.loginId || sourceData.loginId,
                                userNo: result.packageInfo.lotteryInfo.userNo || sourceData.userNo,
                                from: 'me',
                                packageNo: result.packageInfo.packageNo,
                                prePageName: '详情页'
                        }),
                        'joinTimes':result.packageInfo.buyLotteryTimes
                    },
                    {'desc':'夺宝指南','url': Config.jrHost + '/hybrid/duobao/guide.html'+'?prePageName=国美金融:一元夺宝:详情页'}
                ]

                joinList.data = result.orderInfoList

                btnNav.data = result.packageInfo

                btnNav.next = Config.jrHost + '/hybrid/duobao/detail.html?packageNo='+result.packageInfo.nextPackageNo+'&prePageName=国美金融:一元夺宝:详情页'

            }else{
                init(result,from,sourceData)
            }
        },requestError , {
            "systemNo": Config.systemNo,
            "version": Config.version,
            "reqType":"P1000000003",
            'packageNo': sourceData.packageNo,
            "userNo": sourceData.userNo
        })   
    }
    //请求失败容错
    var requestError = function(){
        new Components.ErrorPage.Default({
            events: {
                click: requestDetail
            }
        }).$mount().$appendTo('body')
    }
    //如果登录则去获取用户信息
    var requestDetail = function(isReload){
        if(login){
            // navigator.gome.util.nativeUtils.getUserInfo(function(data){
            //     request(data,isReload)
            // })
            $g.getUserInfo()
                .then(function(data){
                    request(data,isReload)
                }).catch(function(){
                    
                })
        }else{
            request(null,isReload)
        }
    }
    var start = function(isReload){
        //判断是否登录
        // navigator.gome.util.nativeUtils.isLogin(function(result){
        //     result = typeof result === 'string' ? JSON.parse(result) : result
        //     isLogin(result.isLogin)
        //     //发起请求
        //     requestDetail(isReload)
        // });
        $g.getUserInfo().then(function(info){
            login = true
            //发起请求
            request(info,isReload)
        }).catch(function(msg){
            login = false
            //发起请求
            request(null,isReload)
        })
    }
    window.reload = function(){
        start(true)
    }
    // $g.ready().then(function(){
    $g.ready()
    .then(function(){
        $g.setTitle('夺宝详情')
        start()        
    })    
})
