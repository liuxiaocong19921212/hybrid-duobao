/**
 * Author 赵晔
 * Created-Time 2016-09-23
 * Last-Modefied-Time 2016-09-23
 * 有关环境的配置文件
 */
import CONFIG from './__config__.js'
module.exports = {
	platform: {},
	env:{},
	system: {},
	host: {
		wap: {},
		prom: {},
	},
	protocal: (function(){
        if(!window.location.href.match(/^file/)){

            return '//'
		}else if(navigator.userAgent.match(/gome/)){
			 if(!navigator.userAgent.match(/gomeplus/) && navigator.userAgent.match(/iphone/)){
				var version = navigator.userAgent.match(/gome\/iphone\/(\d*)/)[1]
				if(version >= 75){
					return 'https://'
				}else{
					return 'http://'
				}
			}else{
				// plus 的话，协议头返回http
				return 'http://'
			}
		}else{
        	return 'http://'
        }

    })(),
	scope: CONFIG.SCOPE,
	project: CONFIG.PROJECT
}
function concatUrl(val){
	if(CONFIG.ENV.match(/uat/i)){
		if( !$g.env.hybrid && location.href.match(/plus\.com/)){
			return module.exports.protocal + val + '.uatplus.com'
		}else{
			return module.exports.protocal + val + '.atguat.com.cn'
		}
	}else{
		if( !$g.env.hybrid && location.href.match(/plus\.com/)){
			return module.exports.protocal + val + '.gomeplus.com'
		}else{
			return module.exports.protocal + val + '.gome.com.cn'
		}
	}
}
Object.defineProperty(module.exports.host.wap, 'm', {
	get: function(){
		return concatUrl('m')
	}
})
Object.defineProperty(module.exports.host.wap, 'jr', {
	get: function(){
		return concatUrl('jr.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'u', {
	get: function(){
		return concatUrl('u.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'tuan', {
	get: function(){
		return concatUrl('tuan.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'v', {
	get: function(){
		return concatUrl('v.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'q', {
	get: function(){
		return concatUrl('q.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'prom', {
	get: function(){
		return concatUrl('prom.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'pt', {
	get: function(){
		return concatUrl('pt.m')
	}
})
Object.defineProperty(module.exports.host.wap, 'item', {
	get: function(){
		return concatUrl('item.m')
	}
})
/**
 * env
 */
Object.defineProperty(module.exports.env, 'pro', {
	get: function(){
		return (CONFIG.ENV == 'PRO' || CONFIG.ENV == 'LIVE') ? true : false
	}
})
Object.defineProperty(module.exports.env, 'uat', {
	get: function(){
		return CONFIG.ENV == 'UAT' ? true : false
	}
})
Object.defineProperty(module.exports.env, 'dev', {
	get: function(){
		return CONFIG.ENV == 'DEV' ? true : false
	}
})
/**
 * platform
 */
Object.defineProperty(module.exports.platform, 'app', {
	get: function(){
		return CONFIG.PLATFORM == 'APP' ? true : false
	}
})
Object.defineProperty(module.exports.platform, 'wap', {
	get: function(){
		return CONFIG.PLATFORM == 'WAP' ? true : false
	}
})
/**
 * system
 */
Object.defineProperty(module.exports.system, 'android', {
	get: function(){
		return window.navigator.userAgent.match(/android/i) ? true : false
	}
})
Object.defineProperty(module.exports.system, 'ios', {
	get: function(){
		return window.navigator.userAgent.match(/iPad|iPhone/i) ? true : false
	}
})
Object.defineProperty(module.exports.system, 'gome', {
	get: function(){
		return window.navigator.userAgent.match(/gome/i) ? true : false
	}
})
