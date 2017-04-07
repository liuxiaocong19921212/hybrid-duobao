cordova.define("gome-util-nativeRequest.nativeRequest", function(require, exports, module) {
               var exec=require('cordova/exec');
               module.exports={
               //自定义方法
               sendNativeRequest:function(addSuc,addFaild,args) {
                    var ok = function(data){
                      var d
                      try{
                        d = typeof data === 'string' ? JSON.parse(data) : data
                      }catch(e){
                        d = data
                      }
                      addSuc(d)
                    }
                    exec(ok,addFaild,"RequestPlugin","sendNativeRequest",[args]);
               },
               sendNativeLayoutRequest:function(addSuc,addFaild,args) {
                    exec(addSuc,addFaild,"RequestPlugin","sendNativeLayoutRequest",[args]);
               }
       };
});

