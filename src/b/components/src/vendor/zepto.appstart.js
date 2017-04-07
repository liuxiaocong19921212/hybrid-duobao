/*
* @Author: 
* @Date:   
* @Last Modified by: liuxiaocong
* @Last modified time: 2016-6-13 15:43;
*/
;(function ($, window, undefined) {
    var AppStart = function (element, options) {
        this.settings = $.extend({}, AppStart.defaults, options);
        this.$element = $(element);
        this.openState = false;
        this.init();
        }
    //下载的url
    var dUrl = (function(){
        if(window.location.host.match(/gome\.com\.cn|atguat\.com\.cn/)){
            return 'http://shouji.gome.com.cn/kd/WAP.html'
        }else{
            return 'http://shouji.gomeplus.com/kd/PWAP.html'
        }
    })();
    AppStart.prototype = {
        init: function () {
            if(this.settings && this.settings.type == 'auto'){
                //this.$element.on('click',$.proxy(this.autoAppStart, this)); 
                //this.$element.trigger('click')
                this.autoAppStart();
            }else{
                this.$element.on('click', $.proxy(this.appStart, this))
            }
        },
        //普通唤醒，之后又下载的
        appStart: function () {
            //定义唤醒scheme url
            //在线
            if(window.location.host.match(/gome\.com\.cn|atguat\.com\.cn/)){
                var search = location.search ? location.search : '?browserSkipType=10&cmpid=wap_banner';
                var ios_native_url = 'GomeEShop://home' + search;
                var andriod_native_url = 'gomeeshop://home' + search;
            }else{
            //美信
                var ios_native_url = 'gomeplusapp://m.gomeplus.com/index.html';
                var andriod_native_url = 'gomeplusapp://m.gomeplus.com/index.html';
            }
            //微信唤醒url就是下载url
            var weinxin_native_url = dUrl;
            //只下载模式
            var andriod_download_url = dUrl;
            var ios_download_url = dUrl;
            if(this.settings && this.settings.url){
            //自定义url模式
                var andriod_download_url = this.settings.url;
                var ios_download_url = this.settings.url;
            }
            config_obj = {
                iosInstallUrl: ios_download_url,
                androidInstallUrl: andriod_download_url,
                iosNativeUrl: ios_native_url,
                andriodNativeUrl: andriod_native_url,
                packages: 'com.gome.eshopnew',
                weixinNativeUrl: weinxin_native_url
            };
            this.redirectToNative(config_obj);
        },
        //唤醒不下载
        autoAppStart: function(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua && ua.match(/gome/i)){return};
            if(ua.indexOf('ucbrowser')>-1
                ||ua.indexOf('mqqbrowser')>-1
                ||ua.indexOf('iphone')>-1
                ||ua.indexOf('sogoumobilebrowser')>-1){
                    if( ua.indexOf('micromessenger')>-1
                        || ua.indexOf('mqqbrowser qq')>-1){
                        return
                    };
                var href = location.href;
                var realHref = location.pathname;
                if(window.location.host.match(/gome\.com\.cn|atguat\.com\.cn/)){
                    var ios_native_url = "gomeeshop://" + href.split(/http[s]?:\/\//)[1];
                    var andriod_native_url = "gomeeshop://" + href.split(/http[s]?:\/\//)[1];
                }else{
                    var ios_native_url = "gomeplusapp://" + href.split(/http[s]?:\/\//)[1];
                    var andriod_native_url = "gomeplusapp://" + href.split(/http[s]?:\/\//)[1];
                }
                var andriod_download_url = '';
                var ios_download_url = '';
                config_obj = {
                    iosInstallUrl: ios_download_url,
                    androidInstallUrl: andriod_download_url,
                    iosNativeUrl: ios_native_url,
                    andriodNativeUrl: andriod_native_url,
                    packages: "com.gome.eshopnew"
                };
                this.redirectToNative(config_obj);
            }else{
                return
            }         
        },
        //唤醒
        redirectToNative: function (config) {

            var userAgent = this._UA();

            if (!userAgent) {
                return
            }
            if (userAgent == 'ios') {
                this.installUrl = config.iosInstallUrl;
                this.nativeUrl = config.iosNativeUrl;
                this.openTime = config.iosOpenTime || 3000;
            } else if (userAgent == 'weixin') {
                this.nativeUrl = config.weixinNativeUrl;
            } else {
                this.installUrl = config.androidInstallUrl;
                this.nativeUrl = config.andriodNativeUrl;
                this.openTime = config.androidOpenTime || 3000;
                this.packages = config.packages || 'com.gome.eshopnew';
            }
            //只有android下的chrome要用intent协议唤起native
            this._gotoNative();
            
        },
        _UA: function () {
            var ua = navigator.userAgent;
            var ua_low = navigator.userAgent.toLowerCase();
            if (ua_low.match(/MicroMessenger/i) == 'micromessenger') {
                return 'weixin';
            } else {
                if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    return 'ios';
                } else if (!!ua.match(/Android/i)) {
                    return 'android';
                } else {
                    return '';
                }
            }

        },
        //唤醒？
        _gotoNative: function () {
            if (this.settings && this.settings.type == 'download') {
                var _this = this,
                    startTime = Date.now(),
                    iframe = document.createElement('iframe');
                var a = document.createElement('a');
                iframe.id = 'J_redirectNativeFrame';
                iframe.style.display = 'none';
                iframe.src = this.nativeUrl;
                /*a.href = this.nativeUrl;;
                a.click();*/
                $('body').append(iframe);
                setTimeout(function () {
                    document.body.removeChild(iframe);
                    _this._gotoDownload(startTime);
                }, this.openTime);
            }else {
                var _this = this,
                    startTime = Date.now(),
                    iframe = document.createElement('iframe');
                iframe.id = 'J_redirectNativeFrame';
                iframe.style.display = 'none';
                iframe.src = this.nativeUrl;
                if(navigator.userAgent.match(/android/i)){
                    $('body').append(iframe);
                }else{
                    location.href = this.nativeUrl;
                }
                setTimeout(function () {
                    if(navigator.userAgent.match(/android/i))
                        $(iframe).remove();
                    //唤醒模式也会进来这个方法
                    //屏蔽下
                    if(_this.settings && _this.settings.type == "auto"){
                        //do nothing
                    }
                    else{
                        _this._gotoDownload(startTime);
                    }
                }, this.openTime);
            }
        },

        _gotoDownload: function (startTime) {
            var endTime = Date.now();
            if (endTime - startTime < this.openTime + 500) {
                window.location.href = dUrl;
            }
        }

    }

    AppStart.defaults = {}

    $.fn.appstart = function (options) {
        return this.each(function () {
            var appstart = new AppStart(this, options);
            return;
        });
    };
})(window.Zepto, window);
