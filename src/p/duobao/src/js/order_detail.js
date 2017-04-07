require([
    'widgets.btmNav.btn.default',
    'widgets.pd.order',
    'config',
    'docode',
    'components',
    'fastclick',
    'queryparser',
    ],
function(
      BottomNav
    , Product
    , Config
    , Docode
    , Components
    , FastClick
    , QueryParser){

    $g.ready()
    .then(function(){
        $g.setTitle('订单信息')
        var dataSource = QueryParser.parse(window.location.search)
        $g.getUserInfo()
            .then(function(data){
                if(data){
                    dataSource.userNo = data.profileId
                    dataSource.loginId = data.userName || data.loginName
                }
           

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

            function checkPhone(number){ 
                if(!(/^1[3|4|5|7|8]\d{9}$/.test(number))){
                    return false;
                }else{
                    return true
                }
            }

            var init = function(data){
                /**
                 * 协议组件
                 */
                var protocal = new Vue ({
                    el: '.tips',
                    // template:    '<div style="display:none" v-show="tipsShow" class="tips-detail">'
                    //           +      '<p v-for="item in promptInfo">{{item}}</p>'
                    //           +  '</div>',
                    template:    '<div class="tips-protocol">'
                                +       '<span class="checkbox active" :class="{active: isActive}" @click="onClick"></span>'
                                +       '<div class="protocol">'
                                +           '我已阅读并同意<a :href="href">《夺宝相关协议》</a>'
                                +       '</div>'
                                +   '</div>'
                                +   '<div style="display:none" v-show="tipsShow" class="tips-detail">'
                                +      '<p v-for="item in promptInfo">{{item}}</p>'
                                +  '</div>',
                    replace: false,
                    data: {
                        isActive: true,
                        href: Config.jrHost + '/hybrid/duobao/protocal.html?prePageName=填写订单页',
                        tipsShow: false,
                        promptInfo: ''
                    },
                    created: function(){
                        this.promptInfo = data.promptInfo
                        this.tipsShow = true
                    },
                    methods: {
                        onClick: function(){
                            if(this.isActive)
                                this.isActive = false
                            else
                                this.isActive = true
                        }
                    }
                })
                /**
                 * 手机号
                 */
                var phone = window.phone = new Vue({
                    el: '.phone-info',
                    replace: false,
                    template: document.querySelector('.phone-info').innerHTML,
                    data: {
                        placeholder: data.mobileShow || '请输入手机号码',
                        number:  data.mobileShow,
                    },
                    computed: {
                        phoneNo: function(){
                            return this.number == data.mobileShow ?  data.mobile : this.number
                        }
                    },
                    created: function(){
                        this.$watch('number',function(val){
                            if(checkPhone(val)){
                                this.mobile = val
                            }
                        })
                    },
                    methods: {
                        onClick: function(){
                            if(phone.number === data.mobileShow){
                                this.number = ''
                            }
                        },
                        onBlur: function(){
                            if(!this.number && data.mobileShow){
                                this.number = data.mobileShow
                            }
                        },
                        onInput: function(){
                            if(this.number.match(/[^\d]+/)){
                                this.number = this.number.replace(/[^\d]+/,'')
                            }
                        }
                    }
                })
                /**
                 * 商品
                 */
                new Product({
                    el: '.product-info',
                    data: {
                        imgPath: data.packageInfo.imgPath,
                        title: data.packageInfo.packageShowNm,
                        number: data.buyLotteryTimes,
                        price: data.buyMoney,
                    },
                })
                /**
                 * 底部导航
                 */
                new BottomNav({
                    el: '.bottom-nav',
                    data: {
                        price: data.buyMoney,
                    },
                    computed: {
                        enable: function(){
                            if(phone.number && protocal.isActive && (checkPhone(phone.number) || phone.number == data.mobileShow)){
                                return true
                            }else{
                                return false
                            }
                        }
                    },
                    methods: {
                        setCookie:function(c_name, value, time, domain){
                            var expires = ((time==null) ? "" : ";expires=" + new Date(new Date().getTime() + Number(time)).toGMTString())
                            var domain = !domain ? '' : ';domain=' + domain
                            document.cookie=c_name+ "=" + encodeURIComponent(value) + domain + expires + ';path=/'
                        },
                        onClick: function(){
                            if(!this.enable)return
                            if((phone.number === data.mobileShow) || checkPhone(phone.number)){
                                this.order();
                            }else{
                                navigator.gome.util.nativeUtils.showToast('请输入正确的手机号码');
                            }
                        },
                        order: function(){
                            
                            Docode.request(this.ok
                            , function(){
                                console.log('fail')
                            }, {
                                'systemNo': Config.systemNo,
                                'userNo': dataSource.userNo,
                                'loginId': dataSource.loginId,
                                'version': '3.0',
                                'mobile': phone.phoneNo,
                                'reqType': 'P1000000010',
                                'packageNo': dataSource.packageNo,
                                'buyLotteryTimes': dataSource.buyLotteryTimes,
                                'buyMoney': dataSource.buyMoney
                            })
                        },
                        ok: function(data){
                            var result = data.encReqInfo
                            var self = this
                            if(data.isSuccess && data.isSuccess === 'Y'){
                                //份额不足,Y的时候也可能会返回
                                if(result.doOrderErrorCode && result.doOrderErrorCode == '1'){
                                    new Components.Alert.Default({
                                        data: {
                                            content: data.resDesc,
                                            ok: '继续下单',
                                            cancel: '我再看看',
                                        },
                                        events: {
                                            ok: function(){
                                                dataSource.buyLotteryTimes = result.packageInfo.leftNum
                                                dataSource.buyMoney = result.packageInfo.leftNum * result.packageInfo.yygoGradeAmount
                                                self.order()
                                            },
                                            cancel: function(){
                                                navigator.gome.util.nativeUtils.nativeFinish()
                                            }
                                        }
                                    })
                                }else{
                                    // php采用 encodeURIComponent 编码
                                    var _domain = Config.wapMHost.replace(/http[s]?:\/\//,'.')
                                    this.setCookie('mmStr',';一元夺宝;' + Number(dataSource.buyLotteryTimes) + ';' + Number(dataSource.buyMoney),1000*60*60,_domain)
                                    setTimeout(function(){
                                        if(Config.platform == 'wap'){
                                            window.location.href = Config.wapMHost + '/cashier.html?order_id=' + result.orderNo + '&order_source=11&source=1'
                                        }else{
                                            window.location.href = Config.jrHost+'/duobao_cashierdesk-'+result.orderNo+'-'+11+'.html'
                                        }
                                    },10)
                                }
                            }else{
                                //份额不足
                                if(result.doOrderErrorCode && result.doOrderErrorCode == '1'){
                                    new Components.Alert.Default({
                                        data: {
                                            content: data.resDesc,
                                            ok: '继续下单',
                                            cancel: '我再看看',
                                        },
                                        events: {
                                            ok: function(){
                                                dataSource.buyLotteryTimes = result.packageInfo.leftNum
                                                dataSource.buyMoney = result.packageInfo.leftNum * result.packageInfo.yygoGradeAmount
                                                self.order()
                                            },
                                            cancel: function(){
                                                navigator.gome.util.nativeUtils.nativeFinish()
                                            }
                                        }
                                    })
                                }else
                                    navigator.gome.util.nativeUtils.showToast(data.resDesc)
                            }
                        }
                    }
                })
            }
            Docode.request(function(data){
                var result = data.encReqInfo
                init(result)
            },new Function, {
                'systemNo': Config.systemNo,
                'userNo': dataSource.userNo,
                'version': Config.version,
                'reqType': 'P1000000009',
                'packageNo': dataSource.packageNo,
                'buyLotteryTimes': dataSource.buyLotteryTimes,
                'buyMoney': dataSource.buyMoney
            })    
         //调用埋码
            var maima = {
                "pageName": "国美金融:购物流程:一元夺宝:填写订单",
                "channel": "国美金融",
                "prop1": "国美金融:一元夺宝",
                "prop2": "国美金融:购物流程:一元夺宝",
                "prop3": "国美金融:购物流程:一元夺宝:填写订单",
                "prop4": "国美金融:购物流程",
                "prop6": "国美金融理财产品填写订单页",
                "prop27": dataSource.prePageName ,
                'events':'scCheckout',
                'products':';一元夺宝;;;;eVar50=一元夺宝'
            }
            navigator.gome.util.nativeUtils.getMeasure(maima);
         }).catch(function(){
            $g.login()
        })
    })

})

