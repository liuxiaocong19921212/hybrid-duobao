<template >
	<div class="btm_nav_occup" v-if="data.apiPackageStat == '020' || (data.apiPackageStat !== '020' && data.nextPackageNo && data.nextPackageNo != data.packageNo)"></div>
	<div class="btm_nav" v-if="data.apiPackageStat == '020'">
		<btn class="db_btn" @click="onClick" v-ref:btn-nav>立即夺宝</btn>
	</div>
	<div class="btm_nav" v-if="data.apiPackageStat !== '020' && data.nextPackageNo && data.nextPackageNo != data.packageNo">
		<div class="box v_center flex1">
        	新一期正在火热进行中...
        </div>
        <btn :href="next" class="db_btn_sm" :class="isEnabled">立即前往</btn>
	</div>
</template>
<script>
	import Config from 'config'
	import Docode from 'docode'
	import comps from 'components' 
	import QueryParser from 'queryparser'
	import Dialog from 'widgets.order.dialog'
	export default(
		Vue.extend({
			data: function(){
				return {
					dialog: {}
				}
			},
			components:{
				'btn':comps.Button
			},
			created: function(){
				this.dialog = new Dialog({
	        		data: {
	        			data: {},
	        			userNo: {},
	        			pageName: '详情页'
	        		}
	        	}).$mount().$appendTo('body')
			},
			methods: {
				onClick: function(){
					var self = this
					// navigator.gome.util.nativeUtils.isLogin(function(data){
					// 	data = typeof data == 'string' ? JSON.parse(data) : data
					// 	if(data.isLogin == 'Y'){
					// 		navigator.gome.util.nativeUtils.getUserInfo(function(data){
					// 			data = typeof data == 'string' ? JSON.parse(data) : data
					// 			self.showDialog(data)
					// 		})
					// 	}else{
					// 		if(Config.platform == 'wap'){
     //    						window.location.href = Config.wapMHost + '/login.html'
					// 		}else{
					// 			navigator.gome.app.nativeLogin.jumpToNativeLogin(function(){
					// 				navigator.gome.util.nativeUtils.getUserInfo(function(data){
					// 					data = typeof data == 'string' ? JSON.parse(data) : data
					// 					self.showDialog(data)
					// 				})
					// 			},new Function)
					// 		}
					// 	}
					// })
					$g.getUserInfo()
						.then(function(data){
							if(data){
								self.showDialog(data)
							}
						}).catch(function(){
							$g.login();
						})
				},
				showDialog: function(userInfo){
					var self = this
					Docode.request(function(data){
                		data = typeof data === 'string' ? JSON.parse(data) : data
			            var result = data.encReqInfo
			            if(data.isSuccess == "Y"){
			            	if(result.isSuccess == 'N' || result.enablePlaceOrder == 0){
				            	window.reload()
				        		navigator.gome.util.nativeUtils.showToast(data.resDesc)
				            }else{
				            	if(Config.platform != 'wap'){
						            navigator.gome.util.nativeUtils.showNativeDialog(result,'1')
					            }
						        else{
						        	self.dialog.data = result
						        	self.dialog.userNo = userInfo.profileId
						        	self.dialog.show()
						        }
				            }
			            }else{
			        		navigator.gome.util.nativeUtils.showToast(data.resDesc)
			            	window.reload()
			            }
			            
			        }, function(data){
			        	if(data && data.isSuccess){
			        		navigator.gome.util.nativeUtils.showToast(data.resDesc)
			        	}else{
			        		navigator.gome.util.nativeUtils.showToast('请求失败')
			        	}
			        }, {
                        "systemNo": Config.systemNo,
                        "version": Config.version,
                        "reqType":"P1000000008",
                        'packageNo': this.data.packageNo,
                        "userNo": userInfo.profileId
			        })   
				}
			}
		})
	)
</script>
<style lang='less'>
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/duobao.less';
	.btm_nav_occup{
		.set-line-height(3; @font-lg-sm);
	}
	.btm_nav{
		.flexbox();
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #f9f9f9;
		border-top: 1px solid @duobao-border;
		.set-line-height(3; @font-lg-sm);
		z-index: (@z-nm+1);
		.db_btn{
			.flexitem(1);
			color: @white;
		    text-align: center;
		    background: @red;
		    margin: .08rem .14rem;
		    font-size: @font-lg-sm;
		    border-radius: .04rem;
		    .set-line-height(1; @font-sm*4);
		}
		.box{
			padding-left: .2rem;
    		font-size: @font-nm;
		}
		.db_btn_sm{
			background: @red;
		    color: @white;
		    width: 2rem;
		    text-align: center;
		    .set-line-height(3; @font-lg-sm*3);
		}
	}
</style>