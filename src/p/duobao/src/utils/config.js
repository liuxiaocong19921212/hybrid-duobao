/*
* @Author: zhaoye-ds1
* @Date:   2016-07-14 21:48:55
 * @Last Modified by: liuxiaocong
 * @Last Modified time: 2017-02-27 11:34:48
*/

'use strict';
import comps from 'components'
var env = 'unknown'
if(location.host.match(/m\.gome\.com\.cn/)){
    env = 'pro'
}else if(location.host.match(/m\.tslive\.com\.cn/)){
    env = 'tslive'
}else if(location.host.match(/atguat\.com\.cn/)){
    env = 'uat'
}else if(!location.href.match(/http[s]?/)){
    env = 'pro'
}
var isLogin = false
var userInfo = null
$g.ready()
.then(function(){
    // navigator.gome.util.nativeUtils.getAppEnvironment(function(data){
    //     data = typeof data === 'string' ? JSON.parse(data) : data
    //     env = data.environment
    // })
    if($g.env.uat){
        env = 'uat'
    }else if($g.env.tslive){
        env = 'tslive'
    }else if($g.env.live){
        env = 'pro'
    }
})
module.exports = {
        reqType: {
            Index: 'P1000000001',
            LuckyList: 'P1000000002',
            Detail: 'P1000000003',
        },
        version: '3.0',
        initData: function(cb){
            $g.getUserInfo().then(function(data){
                data = typeof data === 'string' ? JSON.parse(data) : data
                cb(data)
            })
        },
        STATUS: {
            ALL: '010',
            DOING: '020',
            SOON: '030',
            DONE: '040',
            WIN: '050'
        },
    }
var version = 0;
var protocol = 'http:'
// if(navigator.userAgent.match(/gome/) && navigator.userAgent.match(/android/i))
// if($g.env.gome && navigator.userAgent.match(/android/i))
//     version = navigator.userAgent.match(/gomeplus\/(\d*)/)[1];
// else if(navigator.userAgent.match(/iPhone|iPad/i) && $g.env.gome == true){
//     version = navigator.userAgent.match(/gomeplus\/iphone\/(\d*)\//) ? navigator.userAgent.match(/gomeplus\/iphone\/(\d*)\//)[1] : 0;
//     if(version >= 75){
//         protocol = 'https:'
//     }
// }else if($g.env.gomeplus){
//     protocol = 'https:'
// }

if(navigator.userAgent.match(/gomeplus/)){
    if(navigator.userAgent.match(/iphone/)){
        var version = navigator.userAgent.match(/gomeplus\/iphone\/(\d*)/)[1]
            protocol = 'https:'
    }else{
        protocol = 'http:'
    }
}else if(!navigator.userAgent.match(/gomeplus/) && navigator.userAgent.match(/gome/)){
    if(navigator.userAgent.match(/iphone/)){
        var version = navigator.userAgent.match(/gome\/iphone\/(\d*)/)[1]
        if(version >= 75){
            protocol = 'https:'
        }else{
            protocol = 'http:'
        }
    }else{
        protocol = 'http:'
    }
}else{
    protocol = 'http:'
}


Object.defineProperty(module.exports, 'platform', {
    get: function(){
        if(window.navigator.userAgent.match(/dev/)){
            return 'dev'
        }else if(window.location.href.match(/^http[s]?/)){
            return 'wap'
        }else if(window.navigator.userAgent.match(/Android/i)){
            return 'android'
        }else if(window.navigator.userAgent.match(/iPhone|iPad/i)){
            return 'ios'
        }
    }
})
Object.defineProperty(module.exports,'env',{
    get: function(){
        return env
    }
})
Object.defineProperty(module.exports, 'requestUrl',
{
    get: function(){
        // var version = 0;
        // var protocol = 'http:'
        // if(navigator.userAgent.match(/gome/) && navigator.userAgent.match(/android/i))
        //     version = navigator.userAgent.match(/gome\/(\d*)/)[1];
        // else if(navigator.userAgent.match(/gome/) && navigator.userAgent.match(/iPhone|iPad/i)){
        //     version = navigator.userAgent.match(/gome\/iphone\/(\d*)\//) ? navigator.userAgent.match(/gome\/iphone\/(\d*)\//)[1] : 0;
        //     if(version >= 75){
        //         protocol = 'https:'
        //     }
        // }
        if(module.exports.platform != 'wap'){
            if(env === 'uat'){
                return protocol + "//10.58.56.88:3600/mobile-finance-web/services.json"
            }else if(env === 'pro'){
                return protocol + "//jr.mobile.gome.com.cn/services.json"
            }
        }else{
            // if(env === 'uat'){
            //     return "//jr.m.atguat.com.cn/index.php?ctl=duobao&act=getAjaxData"
            // }else if(env === 'pro'){
            //     return "//jr.m.gome.com.cn/index.php?ctl=duobao&act=getAjaxData"
            // }else{
            //     return "//" + window.location.host + "/index.php?ctl=duobao&act=getAjaxData"
            // }

            return $g.host.jr + "/index.php?ctl=duobao&act=getAjaxData"
        }
        
    }
})
Object.defineProperty(module.exports, 'jrHost',
{
    get: function(){
        // if(module.exports.platform != 'wap'){
        //     if(env === 'uat'){
        //         return protocol + "//jr.m.atguat.com.cn"
        //     }else if(env === 'pro'){
        //         return protocol + '//jr.m.gome.com.cn'
        //     }
        // }else{
            // if(env === 'uat'){
            //     return "//jr.m.atguat.com.cn"
            // }else if(env === 'pro'){
            //     return "//jr.m.gome.com.cn"
            // }else{
            //     return '//' + window.location.host
            // }
        // }
        return $g.host.jr
    }
})
Object.defineProperty(module.exports, 'wapMHost',
{
    get: function(){
        // if(env === 'uat'){
        //     return "//m.atguat.com.cn"
        // }else if(env === 'pro'){
        //     return "//m.gome.com.cn"
        // }else if(env == 'tslive'){
        //     return "//m.tslive.com.cn"
        // }else{
        //     return "//m.gome.com.cn"
        // }
        return $g.host.m
    }
})
Object.defineProperty(module.exports, 'wapUHost',
{
    get: function(){
        // if(env === 'uat'){
        //     return "//u.m.atguat.com.cn"
        // }else if(env === 'pro'){
        //     return "//u.m.gome.com.cn"
        // }else{
        //     return "//u.m.gome.com.cn"
        // }
        return $g.host.u
    }
})
Object.defineProperty(module.exports, 'atgHost', {
    //请求原生 addressList.jsp
    get: function(){
        // if(module.exports.platform != 'wap'){
        //     if(env === 'uat'){
        //         return protocol + '//mobile.atguat.com.cn/'
        //     }else if(env === 'pro' ){
        //         return protocol + '//mobile.gome.com.cn/'
        //     }else{
        //         return protocol + '//mobile.gome.com.cn/'
        //     }
        // }else{
            if(env === 'uat'){
                return "//mobile.atguat.com.cn"
            }else if(env === 'pro'){
                return "//mobile.gome.com.cn"
            }else{
                return "//mobile.gome.com.cn"
            }
        // }        
    }
})
Object.defineProperty(module.exports, 'cmsHost', {
    //请求cms key 首焦图 .jsp
    get: function(){
        if($g.env.gomeplus){
            if($g.env.uat){
                return '//prom.mobile.uatplus.com'
            }else if($g.env.live){
                return '//prom-mobile.gomeplus.com'
            }else{
                return '//prom-mobile.gomeplus.com'
            }
        }else{
            if(env === 'uat'){
                return "//prom.mobile.atguat.com.cn"
            }else if(env === 'pro'){
                return "//prom.mobile.gome.com.cn"
            }else{
                return "//prom.mobile.gome.com.cn"
            }
        }
    }
})
Object.defineProperty(module.exports, 'systemNo',{
    get: function(){
        if(window.location.href.match(/^http[s]?/)){
            return '0003'
        }
        if(window.navigator.userAgent.match(/Android/i)){
            return '0001'
        }else if(window.navigator.userAgent.match(/iPhone|iPad/i)){
            return '0002'
        }
    }
})
