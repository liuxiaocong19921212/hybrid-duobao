/*
* @Author: zhaoye-ds1
* @Date:   2016-07-29 16:11:37
 * @Last Modified by: zhaoye
 * @Last Modified time: 2017-03-04 12:37:39
*/
/**
 * 我的夺宝的入口文件
 * @param  {widget}         myTreasures  我的夺宝的商品列表
 * @param  {widget}         Address      地址选择组件
 * @param  {config}         Config       配置文件
 * @param  {lib}            QueryParser  encode & decode location.search
 * @param  {lib}            Docode       金融加解密工具
 * @param  {lib}            Components   基础组件库
 * @param  {lib}            FastClick)   弟三方库
 * @return null
 */
require([
        'widgets.pdlist.my',
        'widgets.order.address',
        'config',
        'queryparser',
        'docode',
        'components',
        'fastclick',
    ],
    function(
          myTreasures
        , Address
        , Config
        , QueryParser
        , Docode
        , Components
        , FastClick){
        //polyfill
        FastClick.attach(document.body);
        window.requestAnimationFrame=(function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
        }());
        //返回顶部
        new Vue({
            el: '#gotop',
            components: {
                'gotop': Components.Gotop.Solid
            }
        })
        //isShow控制是否显示选择地址控件
        var isShow = true
        //预定义
        var pdList
        //选择地址
        var address = new Address({
                el:'#showAddress',
                data:{
                    /**
                     * 控制是否显示
                     * @type {boolean}
                     */
                    show: isShow,
                    addressInfo:{'s':'22'},
                    /**
                     * 商品信息，等待后续$set
                     * @type {Object}
                     */
                    pdInfo:{},
                },
                compiled:function(){
                },
                methods:{
                    isEmptyObject:function(obj){
                        var key
                        for(key in obj)
                            return !1;
                        return !0
                    },
                },
                events: {
                    addAddressDone: function(){
                        pdList.$broadcast('addAddressDone',this.pdInfo)
                    }
                }
            })
        /**
         * 初始化
         */
        var init = function(userInfo){
            userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
            //初始化我的夺宝列表
            pdList = new myTreasures({
                el: '#my',
                data:{
                    /**
                     * 控制是否显示
                     * @type {boolean}
                     */
                    'show': isShow,
                    /**
                     * 用户信息
                     * @type {Object}
                     */
                    'userInfo': userInfo,
                    'curPdNo': '',
                    childCompTitle:[
                            {'DocTit' : '添加收货地址-国美金融',},
                            {'PageTit' : '添加收货地址'}
                            ],
                    parentCompTitle:[
                            {'DocTit' : '我的夺宝-国美金融',},
                            {'PageTit' : '我的夺宝'}
                        ]
                },
                ready:function(){
                    var _self = this
                    if(Config.platform == 'wap'){
                        if(window.ad_arr && !_self.isEmptyObject(ad_arr)){
                            _self.addHistory();
                            _self.isHistoryState();
                            _self.changeTitle();
                            _self.curPdNo = location.search.split('?')[1].split('&')[0].split('=')[1]
                            if(_self.isEmptyObject(address.pdInfo)){
                                _self.requestPdInfo();
                            }
                        }else if(history.state && history.state.hashval){
                            _self.isHistoryState();
                            _self.requestPdInfo();
                        }else{
                            _self.oriUrl();
                        }  
                    }
                        
                },
                compiled:function(){
                    var self = this
                    window.addEventListener('popstate',function(){
                        self.isHistoryState();
                    })
                },
                methods:{
                    /**
                     * waiting for @liuxiaocong to edit
                     * @return null
                     */
                    oriUrl:function(){
                        history.replaceState(null,'',location.href.split('#')[0]);
                    },
                    isEmptyObject:function(obj){
                        var key
                        for(key in obj)
                            return false
                        return true
                    },
                    addHistory:function(){
                        history.pushState({'hashval':'address'},'','#address')
                    },
                    isHistoryState:function(){
                        var self = this
                        if(history.state){
                            var state = history.state                            
                            if(state.hashval == 'address'){
                                self.show = false
                            }else{
                                self.show = true
                            }
                        }else{

                            self.show = true
                        }
                        self.$set('show',self.show);
                        address.$set('show',self.show);
                        self.changeTitle();
                    },
                    requestPdInfo:function(){
                        Docode.request(function(data){
                            data = typeof data == 'string' ? JSON.parse(data) : data
                            address.pdInfo = data.encReqInfo.packageList[0]
                        },new Function,{
                            'systemNo': Config.systemNo,
                            'version': Config.version,
                            'reqType': 'P1000000012',
                            'curPage': String(this.page),
                            'userNo': this.userInfo.profileId,
                            'statusCode': '050',
                            'packageNo': this.curPdNo
                        })
                    },
                    /**
                     * for wap
                     * @return {[type]} [description]
                     */
                    changeTitle:function(){
                        if(this.show == false){
                            if(document.getElementById('wap_address')){
                                document.getElementById('wap_address').getElementsByTagName('h2').item(0).innerHTML = this.childCompTitle[1].PageTit
                                document.title = this.childCompTitle[0].DocTit
                                $g.setTitle(this.childCompTitle[1].PageTit)
                            }
                        }else{
                            if(document.getElementById('wap_address')){
                                document.getElementById('wap_address').getElementsByTagName('h2').item(0).innerHTML = this.parentCompTitle[1].PageTit
                                document.title = this.parentCompTitle[0].DocTit
                                $g.setTitle(this.parentCompTitle[1].PageTit)
                            }
                        }
                    }
                },
                created:function(){
                    if(Config.platform == 'wap')
                        this.changeTitle();
                },
                events: {
                    /**
                     * 显示地址选择控件
                     * @param  {Object} pdInfo  选择地址时，要显示的商品信息
                     * @return null
                     */
                    showAddress:function(pdInfo){
                        var self = this
                        self.show = false
                        self.$set('show',self.show);
                        address.$set('show',self.show);
                        address.pdInfo = pdInfo;

                        self.addHistory();
                        self.changeTitle();
                    },
                }
            })
        }
        //deviceready
        $g.ready().then(function(){
            // navigator.gome.util.nativeUtils.getUserInfo(init)          
            $g.getUserInfo()
                .then(init)
                .catch(function(){
                    if($g.env.wap){
                        $g.login();
                    }
                })

            $g.setTitle('我的夺宝')

            if($g.env.hybrid){
                if(navigator.gome.util.nativeUtils.titleAction){
                    if(window.navigator.userAgent.match(/android/i)){
                        if(!decodeURI(window.location.search).match(/国美金融.+一元夺宝.+首页/)){
                            navigator.gome.util.nativeUtils.titleAction(new Function ,new Function, {
                                "show": "Y",
                                "back": {
                                    "show": "Y",
                                    //https无所谓，毕竟只是scheme
                                    "scheme": "http://jr.m.gome.com.cn/finance-mycenter.html",
                                    "action": "new",
                                },
                                "title": {
                                    "show": "Y",
                                    "text": "我的夺宝"
                                }
                            })
                        }else{
                            $g.setTitle('我的夺宝')
                        }
                    }else{
                        $g.setTitle('我的夺宝')
                    }
                }
                else{
                    $g.setTitle('我的夺宝')
                }
                function close(){
                    navigator.gome.util.nativeUtils.nativeFinish()
                }
                navigator.gome.util.nativeUtils.isLogin(function(data){
                    data = typeof data === 'string' ? JSON.parse(data) : data
                    if(data.isLogin == 'N'){
                        navigator.gome.app.nativeLogin.jumpToNativeLogin(function(){
                            navigator.gome.util.nativeUtils.isLogin(function(data){
                                data = typeof data === 'string' ? JSON.parse(data) : data
                                if(data.isLogin == "N"){
                                    close()
                                }else{
                                    window.location.reload()
                                }
                            })
                        })
                    }
                },function(){
                    close()
                })
            }
        })
         var sourceData = {};
            if(window.location.search){
                sourceData = QueryParser.parse(window.location.search)
            }
            //调用埋码
            var maima = {
                "pageName": "我的国美:我的夺宝",
                "channel": "我的夺宝",
                "prop1": "我的国美:我的夺宝",
                "prop2": "我的国美:我的夺宝",
                "prop3": "我的国美:我的夺宝",
                "prop4": "我的国美:我的夺宝",
                "prop6": "我的国美:我的夺宝",
                "prop27": sourceData.prePageName ,
            }
            navigator.gome.util.nativeUtils.getMeasure(maima);;  
            
})


