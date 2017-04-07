var Toast = require('../toast/toast.vue')
var Config = require('./config.js')
//devFakePlugin.js
function fake(){
    var jsonpCntr = 0
    var transEnv = function(url){
        if(Config.env.uat)
            return url
                .replace(/\/\/prom.mobile.gome.com.cn/,'\/\/prom.mobile.atguat.com.cn')
                .replace(/\/\/prom-mobile.gomeplus.com/,'\/\/prom.mobile.uatplus.com')
                .replace(/\/\/prom.m.gome.com.cn/,'\/\/prom.mobile.atguat.com.cn')
                .replace(/\/\/prom.m.gomeplus.com/,'\/\/prom.mobile.uatplus.com')
                .replace(/\/\/m.gome.com.cn/,'\/\/m.atguat.com.cn')
                .replace(/\/\/m.gomeplus.com/,'\/\/m.uatplus.com')
        else if(Config.env.pro)
            return url
        else if(Config.env.pre)
            return url.replace(/\/\/prom.mobile.gome.com.cn/,'\/\/prom.mobile.gomeprelive.com.cn').replace(/\/\/prom.m.gome.com.cn/,'\/\/prom.mobile.gomeprelive.com.cn').replace(/\/\/m.gome.com.cn/,'\/\/m.gomeprelive.com.cn')
        else if(Config.env.sit)
            return url.replace(/\/\/prom.mobile.gome.com.cn/,'\/\/10.58.50.98:3502').replace(/\/\/prom.m.gome.com.cn/,'\/\/10.58.50.98:3502').replace(/\/\/m.gome.com.cn/,'\/\/m.gome.com.cn')
        else
            return url
    }
    //dev start
    if(!window.cordova){
        navigator.gome = {
            app: {
                nativeLogin:{
                    jumpToNativeLogin: function(ok,fail,opt){
                        if(confirm('是否登录')){
                            window.localStorage['logintest'] = 'Y'
                            ok('{"jumpToNativeLogin":"Y"}')
                        }else{
                            window.localStorage['logintest'] = 'N'
                            ok('{"jumpToNativeLogin":"N"}')
                        }
                    }
                }
            },
            util: {
                nativeRequest: {
                    //自定义方法
                   sendNativeLayoutRequest: function(ok,fail,opt){
                        opt.url = transEnv(opt.url)
                        var key = 'sale93Jwdpnjbos'//'salegoEFXe1rQRb'//'saleoz4EEJLzbSn'//
                        if(!opt.param){
                            opt.param = {
                                'keyProms': key,
                            }
                        }else{
                            opt.param['keyProms'] = key
                        }
                        if(opt.type =="GET"){
                            if(opt.url == "http://m.gome.com.cn/index.php" || opt.url == "http://m.atguat.com.cn/index.php" || opt.url == "http://m.gomeprelive.com.cn/index.php"){
                                var param = ''
                                for(var key in opt.param){
                                    param += '&'+key+'='+opt.param[key]
                                }
                                window['jsoncallback'] = function(data){
                                    ok(data);
                                }
                                var script = document.createElement('script')
                                script.src = opt.url+'?bust=' + (new Date()).getTime()+param+'&callback=jsoncallback'
                                document.body.appendChild(script)
                            }else{
                                var ajax = new XMLHttpRequest()
                                ajax.open('GET',opt.url.replace('prom.m.gome.com.cn','geekie.online').replace('prom.atguat.com.cn','prom.atguat.com.cn'),true)
                                ajax.send(null)
                                ajax.onreadystatechange = function(){
                                    if(ajax.status == 200)
                                        ok(ajax.responseText)
                                    else
                                        fail('fail')
                                }
                            }
                        }else{
                            var param = encodeURI(JSON.stringify(opt.param));
                            window['jsonp'+jsonpCntr] = function(data){
                                ok(data);
                            }
                            var script = document.createElement('script')
                            script.src = opt.url+'?bust=' + (new Date()).getTime()+'&body='+param+'&callback=jsonp'+jsonpCntr
                            jsonpCntr++;
                            document.body.appendChild(script)
                        }
                    },
                    sendNativeRequest: function(ok,fail,opt){
                        console.log(opt)
                        if(opt.isNeedLoading == 'Y'){
                            var e = document.createEvent('HTMLEvents');
                            e.initEvent('loading',true,false)
                            e.eventType = 'message'
                            window.dispatchEvent(e)
                        }
                        opt.url = transEnv(opt.url)
                        if(Config.platform.wap){
                            var ajax = new XMLHttpRequest()
                            ajax.open(opt.type ,
                                      opt.url,
                                      true)
                            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
                            var param = ''
                            for(var key in opt.param){
                                param += key +'='+opt.param[key]+'&'
                            }
                            if(param)
                                param.replace(/\&$/,'')
                            else
                                param = null
                            ajax.send(param)
                            ajax.onreadystatechange = function(){
                                if(ajax.readyState==4){
                                    if(ajax.status == 200){
                                        var e = document.createEvent('HTMLEvents');
                                        e.initEvent('loaded',true,false)
                                        e.eventType = 'message'
                                        window.dispatchEvent(e)
                                        var res
                                        try{
                                            res = JSON.parse(ajax.responseText)
                                        }catch(e){
                                            res = ajax.responseText
                                        }finally{
                                            ok(res)
                                        }
                                    }
                                    else
                                        fail('fail')
                                }
                            }
                        }else if(Config.project.jr){
                            var url = 'http://10.144.35.22:3721/duobao2'
                            var ajax = new XMLHttpRequest()
                            ajax.open('POST',url)
                            ajax.setRequestHeader("Content-Type","text/plain")
                            var param = ''
                            for(var key in opt.param){
                                param += key +'='+opt.param[key]+'&'
                            }
                            ajax.send(JSON.stringify(opt.param))
                            ajax.onreadystatechange = function(){
                                if(ajax.readyState==4){
                                    if(ajax.status == 200){
                                        var e = document.createEvent('HTMLEvents')
                                        e.initEvent('loaded',true,false)
                                        e.eventType = 'message'
                                        window.dispatchEvent(e)
                                        ok(ajax.responseText)
                                    }
                                    else
                                        fail('fail')    
                                }
                            }
                        }else{
                            var param = encodeURI(JSON.stringify(opt.param));
                            window['jsonp'+jsonpCntr] = function(data){
                                ok(data);
                            }
                            var script = document.createElement('script')
                            if(opt.url.match(/api\.search\.gome\.com\.cn/)){
                                var param = ''
                                for(var key in opt.param){
                                    param += '&'+key+'='+ ((typeof opt.param[key] == 'object') ? JSON.stringify(opt.param[key]) : opt.param[key])
                                }
                                script.src = opt.url+'?bust=' + (new Date()).getTime()+param+'&callback=jsonp'+jsonpCntr
                            }else
                                script.src = opt.url+'?bust=' + (new Date()).getTime()+'&body='+param+'&callback=jsonp'+jsonpCntr
                            jsonpCntr++;
                            document.body.appendChild(script)
                        }
                    }
                },
                nativeUtils: {
                    isLogin: function(ok,fail,data){
                        if(Config.platform.wap){
                            if(window.localStorage['logintest']){
                                 if(window.localStorage['logintest'] === 'Y')
                                     ok('{"isLogin":"Y"}')
                                 else
                                     ok('{"isLogin":"N"}')
                            }else{
                                 ok('{"isLogin":"N"}')
                            }
                        }else{
                            var ajax = new XMLHttpRequest()
                            ajax.open('GET',
                                       '//'+ window.location.host + '/index.php?ctl=duobao&act=isLogin',
                                      true)
                            ajax.send(null)
                            ajax.onreadystatechange = function(){
                                if(ajax.readyState==4){
                                    if(ajax.status == 200){
                                        var e = document.createEvent('HTMLEvents');
                                        e.initEvent('loaded',true,false)
                                        e.eventType = 'message'
                                        window.dispatchEvent(e)
                                        try{
                                            ok(JSON.parse(ajax.responseText))
                                        }catch(e){
                                            ok(ajax.responseText)
                                        }
                                    }
                                    else
                                        fail('fail')
                                }
                            }
                        }
                    },
                    showToast: function(data){
                        var e = document.createEvent('HTMLEvents');
                        e.initEvent('toast',true,false)
                        e.eventType = 'message'
                        e.data = data
                        window.dispatchEvent(e)
                    },
                    showTitle: function(title){
                        console.log('title:'+ title)
                    },
                    shareLink: function(jsonStr){
                        console.log('分享:'+jsonStr)
                    },
                    jumpExternalLink: function(url){
                        console.log('跳转到'+url)
                    },
                    getMeasure: function(param) {
                        if(Config.platform.wap && window.s){
                            s.pageName = param.pageName
                            s.channel = param.channel
                            s.prop1 = param.prop1
                            s.prop2 = param.prop2
                            s.prop3 = param.prop3
                            s.prop4 = param.prop4
                            s.prop6 = param.prop6
                            s.prop27 = param.prop27
                            s.events = param.events
                            s.products = param.products
                            var s_code=s.t();
                            if(s_code)document.write(s_code);
                        }else
                            console.log('调用埋码'+param)
                        
                    },
                    getAppEnvironment: function(ok,fail){
                        //console.log('getAppEnvironment')
                        //ok('{"environment":"uat"}')
                        var env
                        if(Config.env.uat){
                            env = 'uat'
                        }else if(Config.env.pro){
                            env = 'pro'
                        }else if(Config.env.pre){
                            env = 'pre'
                        }
                        ok('{"environment":"'+env+'"}')
                        //ok('{"environment":"pre"}')
                        //ok('{"environment":"sit"}')
                    },
                    getAppVersion: function(ok,fail){
                        if(!!Config.platform.app){
                            ok('{"dev_version": "59","user_version":"4.1.2"}')
                        }else if(!!Config.platform.wap){
                            ok('{"dev_version": "59","user_version":"4.1.2"}')
                        }
                    },
                    getAddressFourArea: function(ok,fail){
                        ok({
                            province: {
                                name:'北京',
                                code: '13000000'
                            },
                            city: {
                                name:'北京市',
                                code: '13020000'
                            },
                            district: {
                                name:'朝阳区(五环里)',
                                code: '11010200'
                            },
                            town: {
                                name:'全部区域',
                                code: '110102001'
                            }
                        })
                    },
                    getUserInfo: function(ok, fail){
                        if(!!Config.platform.wap && !!Config.scope.jr){
                            var arr = document.cookie.split(';')
                            var cookie = {}
                            arr.forEach(function(item){
                                var key = item.split('=')[0].trim()
                                var value = item.split('=')[1].trim()
                                cookie[key] = value
                            })
                            ok({
                                profileId: cookie['memberNo'],
                                userName: cookie['login_username']
                            })
                        }else{
                            ok({
                                profileId: '100011896968',
                                userName: 'ceshiwhh'
                            })    
                        }
                        /*ok({
                            profileId: '100019401321',
                            userName: '18620253087'
                        })*/
                    },
                    getConsigneeAddress: function(ok){
                        ok({
                            "address": "阿拉斯家", 
                            "cityId": "11010000", 
                            "cityName": "北京市", 
                            "consignee": "哇哈哈", 
                            "districtId": "11011300", 
                            "districtName": "平谷区", 
                            "email": "", 
                            "id": "802943077", 
                            "isDefault": true, 
                            "mobile": "187****0739", 
                            "name": "哇哈哈", 
                            "provinceId": "11000000", 
                            "provinceName": "北京", 
                            "townId": "110113007", 
                            "townName": "刘家店镇", 
                            "zipCode": "000000"
                        })
                    },
                    retrieveSData: function(){
                        
                    },
                    nativeFinish:function(){
                        window.history.back();
                    }
                }
            }
        }
        var e = document.createEvent('HTMLEvents');
        e.initEvent('deviceready',true,false)
        e.eventType = 'message'
        document.addEventListener('DOMContentLoaded',function(){
            document.dispatchEvent(e)
        })
    }
    //dev end
}
module.exports = fake
