cordova.define('cordova/plugin_list', function(require, exports, module) {
               module.exports = [
                                {
                                 "file": "plugins/gome-util-nativeRequest/nativeRequest.js",
                                 "id": "gome-util-nativeRequest.nativeRequest",
                                 "clobbers": [
                                              "navigator.gome.util.nativeRequest"
                                              ]
                                 },
                                 {
                                 "file": "plugins/gome-app-nativeLogin/nativeLogin.js",
                                 "id": "gome-app-nativeLogin.nativeLogin",
                                 "clobbers": [
                                              "navigator.gome.app.nativeLogin"
                                              ]
                                 },
                                 {
                                 "file": "plugins/gome-util-nativeUtils/nativeUtils.js",
                                 "id": "gome-util-nativeUtils.nativeUtils",
                                 "clobbers": [
                                              "navigator.gome.util.nativeUtils"
                                              ]
                                 }

                                 
                                 ];
module.exports.metadata =
// TOP OF METADATA
{
    "gome-util-nativeRequest":"1.0.0",
    "gome-app-nativeLogin":"1.0.0",
    "gome-util-nativeUtils":"1.0.0"

}
// BOTTOM OF METADATA
});