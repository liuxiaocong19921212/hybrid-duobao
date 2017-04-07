cordova.define("gome-app-nativeLogin.nativeLogin", function(require, exports, module) {

    var exec = require('cordova/exec');

    var gomeLogin = {
        jumpToNativeLogin:function(success, fail) {
            exec(success, fail, "LoginPlugin", "jumpToNativeLogin", []);
        },
        jumpToNativeLogout:function(success, fail) {
            exec(success, fail, "LoginPlugin", "jumpToNativeLogout", []);
        }
    };

    module.exports = gomeLogin;

    });