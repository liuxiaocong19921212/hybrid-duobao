<template>
	<li>
		<div class="product_box">
			<a :href="href">
				<div class="img_box">
					<img v-lazyload="list.imgPath" onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='">
				</div>
				<h3 class="title" v-if="list.packageShowNm">{{list.packageShowNm}}</h3>
			</a>				
			<div class="btm_status"  v-if="list.apiPackageStat == '020'">
				<!-- 普通商品状态  020:正在进行中-->
				<a :href="href">
					<div class="progress">
						<!-- 进度条 -->
						<div class="rate_wrap">
							<span class="rate" style="width:{{list.finishRate*100+'%'}}"></span>
						</div>
						<div class="data_wrap">
							<span>总需<em>{{list.totalNum}}</em></span>
							<span>剩余<em>{{list.leftNum}}</em></span>
						</div>																		
					</div>
				</a>			
				<div class="bottom_wrap">
					<button @click="onClick" class="db_btn">夺宝</button>
				</div>	
			</div>
			<div class="btm_status"  v-if="list.apiPackageStat == '030'">
				<!-- 030:即将揭晓;-->
				<div class="progress">
					<span class="status">即将揭晓</span>
				</div>
				<div class="bottom_wrap">
						<button class="db_btn db_btn_num">
							<timer  v-ref:timer 
									:time-left="list.leftPublishedTime * 1000">
							</timer>
						</button>
						<button class="db_btn" style="display:none" v-el:btn @click="onClick">查看结果</button>
					</div>
			</div>
			<div class="btm_status"  v-if="list.apiPackageStat == '040'">
				<!--  040:揭晓完成; -->		
				<a :href="href">
					<div class="progress">
						<span class="status">幸运号码</span>
					</div>
				</a>
				<div class="bottom_wrap">
					<button class="db_btn db_btn_num">{{list.lotteryInfo.luckyNum}}</button>
				</div>	
			</div>
			<div class="btm_status"  v-if="list.apiPackageStat == '060'">
				<!-- 030:即将揭晓;-->
				<div class="progress">
					
				</div>
				<div class="bottom_wrap">
					<button class="db_btn">查看结果</button>
				</div>
			</div>
		</div>
	</li>
</template>
<script>
	import Config from 'config'
	import Docode from 'docode'
	import QueryParser from 'queryparser'
	import comps from 'components' 
	export default(
		Vue.extend({
			props:['list'],
			components:{
				'timer': comps.Timer.Default,
				'button': comps.Button
			},
			data: function(){
				return {
					href: Config.jrHost + '/hybrid/duobao/detail.html' + QueryParser.queryify({
						prePageName: '夺宝首页',
						packageNo: this.list.packageNo
					})
				}
			},
			events:{
        		//倒计时结束 的回调
        		timerEnd:function(){
        			if(!this.$refs.timer.$el)return
					this.$refs.timer.$el.parentElement.style.display="none"
					this.$els.btn.style.display="block";
        		}
        	},
        	methods: {
        		onClick: function(){
        			var self = this
        // 			navigator.gome.util.nativeUtils.isLogin(function(data){
        // 				data = typeof data == 'string' ? JSON.parse(data) : data
        // 				if(data.isLogin == 'Y'){ 
        // 					navigator.gome.util.nativeUtils.getUserInfo(function(userInfo){
        // 						userInfo = typeof userInfo == 'string' ? JSON.parse(userInfo) : userInfo
        // 						self.showDialog(userInfo)
        // 					})
        // 				}else{
        // 					if(Config.platform == 'wap')
        // 						window.location.href = Config.wapMHost + '/login.html'
        // 					else{
        // 						navigator.gome.app.nativeLogin.jumpToNativeLogin(function(){
								// 	navigator.gome.util.nativeUtils.getUserInfo(function(data){
								// 		data = typeof data == 'string' ? JSON.parse(data) : data
								// 		self.showDialog(data)
								// 	})
								// },new Function)
        // 					}
        // 				}
        // 			})
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
			            if(Config.platform != 'wap'){
				            navigator.gome.util.nativeUtils.showNativeDialog(result,'1')
			            }
				        else{
				        	// self.$log(result.enablePlaceOrder)
				        	//判断商品可买不可买  enablePlaceOrder = '1' 可买 ‘ 0 ’不可买
				        	
				        	if(result.enablePlaceOrder && result.enablePlaceOrder == '0'){
				        		// result.packageInfo.apiPackageStat = '030'
				        		console.log(result.packageInfo)
				        		navigator.gome.util.nativeUtils.showToast(result.resDesc);
				        		self.$set('list',result.packageInfo)
				        	}else{
					        	self.$parent.dialog.data = result
					        	self.$parent.dialog.userNo = userInfo.profileId
					        	self.$parent.dialog.show()
				        	}
				        }
			        }, function(){
			        	console.log('fail')
			        }, {
                        "systemNo": Config.systemNo,
                        "version": Config.version,
                        "reqType":"P1000000008",
                        'packageNo': this.list.packageNo,
                        "userNo": userInfo.profileId
			        })   
				}
        	}
		})
	)
</script>
<style lang="less">
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/duobao.less';
	@theme_db: #ff5c5c;
	/*奇数*/
	li:nth-child(odd) .product_box{
		padding-left: 0.3rem;
		padding-right: .2rem;
	}
	/*偶数行*/
	li:nth-child(even) .product_box{
		padding-right: 0.3rem;
		padding-left: .2rem;
	}
	.product_box{
		padding: .3rem .24rem .2rem .24rem;
		background: #fff;
		.img_box{
			/*width: 2.6rem;
			height: 2.6rem;*/
			padding: 0 .05rem;
			text-align: center;
			overflow: hidden;
			margin: auto;
		}
		.title{
			word-break: break-all;
			color: @gray-dark;
			font-size: @font-nm-sm;
			margin-top: 0.24rem;
			line-height: 1.5;
			height: .72rem;
			.set-ellipsis-line(2);
		}
		.progress{
			padding-top: .14rem;
		    height: .6rem;
		    box-sizing: border-box;	
		    .rate_wrap{
				height: .06rem;
				border-radius: .06rem;
				width: 100%;
				position: relative;
				background: #e6e6e6;
				.rate{
					position: absolute;
					left: 0;
					top: 0;
					height: .06rem;
					border-radius: .06rem;
					background: @theme_db;
				}
			}
			.status{
				color: @theme_db;
			    font-size: .24rem;
			    padding: .2rem 0;
			}		    
		}		
		/*夺宝相关数据*/	
		.data_wrap{
			.flexbox();
			margin-top: .1rem;
			color: @gray-light;
			font-size: @font-nm-sm;
			text-align: left;
			span{
				.flexitem(1);
			}
			span:last-child{		
				text-align: right;
			}
			span:last-child{		
				text-align: right;
				 em{
					color: @theme_db;
				}
			}
		}
		/*夺宝按钮*/
		.bottom_wrap{		
			margin-top: .2rem;
			.db_btn{
				height: .55rem;
				.set-line-height(1,.55rem);
				background: @theme_db;
				width: 100%;
				color: @white;
				text-align: center;
				border-radius: .04rem;
				font-size: @font-nm;
			}	
			.db_btn_num{
				background: rgba(255,90,90,.1);
				color: @theme_db;
				font-size: Arial!important;
			}
		}
	}
</style>