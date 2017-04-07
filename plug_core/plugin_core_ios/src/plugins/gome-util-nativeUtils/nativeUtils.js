cordova.define("gome-util-nativeUtils.nativeUtils", function(require, exports, module) {

    var exec = require('cordova/exec');

    var gomeUtils = {
        isLogin: function(success) {
            var ok = function(data) {
                data = typeof data === 'string' ? JSON.parse(data) : data
                success(data)
            }
            exec(ok, null, "UtilsPlugin", "isLogin", []);
        },
        showToast: function(args) {
            exec(null, null, "UtilsPlugin", "showToast", [args]);
        },
        jumpExternalLink: function(args) {
            exec(null, null, "UtilsPlugin", "jumpExternalLink", [args]);
        },
        showTitle: function(args) {
            exec(null, null, "UtilsPlugin", "showTitle", [args]);
        },
        getMeasure: function(args) {
            exec(null, null, "UtilsPlugin", "getMeasure", [args]);
        },
        getAppEnvironment: function(success) {
            var ok = function(data) {
                data = typeof data === 'string' ? JSON.parse(data) : data
                success(data)
            }
            exec(ok, null, "UtilsPlugin", "getAppEnvironment", []);
        },
        getAppVersion: function(success) {
            var ok = function(data) {
                data = typeof data === 'string' ? JSON.parse(data) : data
                success(data)
            }
            exec(ok, null, "UtilsPlugin", "getAppVersion", []);
        },
        shareLink: function(args) {
            exec(null, null, "UtilsPlugin", "shareLink", [args]);
        },
        getAddressFourArea: function(success) {
            var ok = function(data) {
                data = typeof data === 'string' ? JSON.parse(data) : data
                success(data)
            }
            exec(ok, null, "UtilsPlugin", "getAddressFourArea", []);
        },
        showNativeDialog: function(args, type) {
            exec(null, null, "UtilsPlugin", "showNativeDialog", [args, type]);
        },
        getUserInfo: function(success, fail) {
            var ok = function(data) {
                data = typeof data === 'string' ? JSON.parse(data) : data
                success(data)
            }
            exec(ok, fail, "UtilsPlugin", "getUserInfo", []);
        },
        getFOne: function(success) {
            exec(success, null, "UtilsPlugin", "getFOne", []);
        },
        getNativeParams: function(success) {
            exec(success, null, "UtilsPlugin", "getNativeParams", []);
        },
        getConsigneeAddress: function(success, fail) {
            exec(success, fail, "UtilsPlugin", "getConsigneeAddress", []);
        },
        retrieveSData: function(ok, fail, args){
            exec(ok,fail,'UtilsPlugin','retrieveSData',[args])
        },         
        nativeFinish: function(ok, fail, args){
            exec(ok, fail, 'UtilsPlugin', 'nativeFinish',[args])
        },
        /*
            参数 {“type”:”tel”, “content”:”18605851210”}

            type 值 tel mailto  sms http 等
            content值 电话号码 邮箱地址 电话号码 uri  等
            回调只有 成功 或 失败 的状态，没有内容
        */
        openDeviceTool: function(ok, fail, args){
            exec(ok, fail, 'UtilsPlugin', 'openDeviceTool',[args])
        }

    };

    module.exports = gomeUtils;

});
