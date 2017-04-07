var CryptoJS = require("crypto-js");
import Config from 'config'
/**
#androidApp-0001  IOSApp-0002 wap-0003

MD5KEY0001=MD5KEY0001ABCDEF
MD5KEY0002=MD5KEY0002ABC123
MD5KEY0003=MD5KEY0003123456
MD5KEY0004=MD5KEY0004654321

AESKEY0001=AESKEY0001ABCDEF
AESKEY0002=AESKEY0002ABC123
AESKEY0003=AESKEY0003123456
AESKEY0004=AESKEY0004654321

 */
var env = 'uat'
function getAESKey(){
    if(window.location.href.match(/^http/))
        return 'AESKEY0003123456'//wap
    if (window.navigator.userAgent.match(/Android/i))
        return 'AESKEY0001ABCDEF' /*android*/ 
    else
        return 'AESKEY0002ABC123'//ios
}

function getMD5Key(){
    if(window.location.href.match(/^http/))
        return 'MD5KEY0003123456'//wap
    if (window.navigator.userAgent.match(/Android/i))
        return 'MD5KEY0001ABCDEF' /*android*/ 
    else
        return 'MD5KEY0002ABC123'//ios
}
//wap
//android

var decrypt = function(d){
    return CryptoJS.AES.decrypt(d, CryptoJS.enc.Utf8.parse(getAESKey()), {
        mode: CryptoJS.mode.ECB,
        iv:  CryptoJS.enc.Utf8.parse('')
    }).toString(CryptoJS.enc.Utf8)
}
var encrypt = function(d){
    return CryptoJS.AES.encrypt(JSON.stringify(d), CryptoJS.enc.Utf8.parse(getAESKey()), {
        mode: CryptoJS.mode.ECB,
        iv:  CryptoJS.enc.Utf8.parse('')
    }).toString()
}

function getParams(){
    if(env == 'pro'){
        return {
            port: 80,
            hostname: 'jr.mobile.gome.com.cn',
            method: 'POST',
            path: '/services.json'
        }
    }else if(env == 'uat'){
        return {
            port: 3600,
            hostname: '10.58.56.88',
            method: 'POST',
            path: '/mobile-finance-web/services.json'
        }
    }
}

module.exports.encode = function(data, systemNo,version){
    var reqTime = new Date().getTime().toString()
    var encReqInfo = encrypt(data)
    var json = {
        "encReqInfo": encReqInfo,
        "systemNo": data.systemNo,
        "version": data.version,
        "reqMessageId": data.systemNo + String(Math.random()).match(/\.(\d{10})/)[1],
        "reqTime": reqTime,
        "sign": CryptoJS.MD5(data.systemNo + reqTime + encReqInfo + getMD5Key()).toString()
    }
    return json
}
module.exports.decode = function(code){
    return decrypt(code)
}


module.exports.request = function(ok,fail,param,isNeedLoading){
    isNeedLoading = !isNeedLoading ? 'Y' : 'N'
    if(Config.platform != 'wap'){
        if(Config.platform == 'dev'){
            var params =  {
                "url": Config.requestUrl,
                "type":"POST",
                "isPostBody": 'Y',
                "param": module.exports.encode(param),
                "isNeedLoading": isNeedLoading
            }
            navigator.gome.util.nativeRequest.sendNativeRequest(function(data){
                data = typeof data == 'string' ? JSON.parse(data) : data
                data.encReqInfo = JSON.parse(module.exports.decode(data.encReqInfo))
                data.encReqInfo = JSON.parse(JSON.stringify(encReqInfo).replace(/\/\//g,'http://'));
                ok(data)
            },fail,params);
        }else{
            //加密
            navigator.gome.util.nativeUtils.retrieveSData(function(data){
                data = typeof data == 'string' ? JSON.parse(data) : data
                var params =  {
                    "url": Config.requestUrl,
                    "type":"POST",
                    "isPostBody": 'Y',
                    "param": data,
                    "isNeedLoading": isNeedLoading
                }
                //请求
                navigator.gome.util.nativeRequest.sendNativeRequest(function(data){
                    data = typeof data == 'string' ? JSON.parse(data) : data
                    //解密
                    navigator.gome.util.nativeUtils.retrieveSData(function(encReqInfo){
                        encReqInfo = typeof encReqInfo == 'string' ? JSON.parse(encReqInfo) : encReqInfo
                        // data.encReqInfo = encReqInfo
                        if($g.system.ios){
                            data.encReqInfo = JSON.parse(JSON.stringify(encReqInfo).replace(/^\/\//g,'https://'));
                        }else{
                            data.encReqInfo = JSON.parse(JSON.stringify(encReqInfo).replace(/^\/\//g,'http://'));
                        }
                        //回调
                        ok(data)
                    },function(a){
                        console.log(fail)
                    },{
                        product: "1",
                        type: "2",
                        data: data.encReqInfo
                    });

                },fail,params);
                
            }, function(a){
            }, {
                product: "1",
                type: "1",
                data: param
            })
        }
    }else{
    //in wap
        var params =  {
            "url": Config.requestUrl,
            "type":"POST",
            "isPostBody": 'Y',
            "param": param,
            "isNeedLoading": isNeedLoading
        }
        navigator.gome.util.nativeRequest.sendNativeRequest(function(data){
            ok(data)
        },fail,params);
    }
    //if in wap
    
}