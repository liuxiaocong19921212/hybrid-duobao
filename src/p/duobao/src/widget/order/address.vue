<template>
	<div class="address-box" v-show="!show">
		<a :href="javascript:;" class="sh-address has-address" @click="changeAddress" v-if="oriAddress && oriAddress!== null">
			<p class="line info">
				<span class="user">{{oriAddress.name}}</span>
				<span class="phone">{{oriAddress.mobile}}</span>
			</p>
			<p class="line address">
				<i class="default" v-if="data.isDefault == true">默认</i>
				<span class="detail-address">{{oriAddress.provinceName}}{{oriAddress.cityName}}{{oriAddress.districtName}}{{oriAddress.townName}}{{oriAddress.address}}</span>
			</p>
		</a>
		<a :href="javascript:;" class="sh-address flexbox" v-else @click="changeAddress">
			<span class="desc box v_center vertical">请先填写收货地址</span>
		</a>
		<div class="product">
			<img :src="pdInfo.imgPath">
			<div class="info">
				<h3 class="title box v_center vertical">
					{{pdInfo.packageShowNm}}
				</h3>
			</div>
		</div>
		<div class="btm_nav">
			<btn class="db_btn" :class="{'disabled':isAble}" @click="onClick" v-ref:btn-nav>提交</btn>
		</div>
	</div>
</template>
<script>
	import Docode from 'docode'
	import Config from 'config'
	import comps from 'components'
	import QueryParser from 'queryparser'
	export default(
		Vue.extend({
			components:{
				'btn':comps.Button
			},
			data:function(){
				return{
					isAble:true,
					isShowSH:false,
					oriAddress:{},
					userInfo:{},
					shHtml:''
				}
			},
			created:function(){
				var self = this
                if(Config.platform == 'wap'){
                	if(window.ad_arr){
                		if(self.isEmptyObject(ad_arr)){
	                		self.oriAddress = address_info
	                	}else{                		
	                		self.oriAddress = ad_arr
	                	}
                	}
                }else{					
					navigator.gome.util.nativeRequest.sendNativeRequest(function(data){
	                    data = typeof data === 'string' ? JSON.parse(data) : data
	                    	self.oriAddress = data.addressList[0]
	                    },function(response){
	                        console.log(response)
	                    }, {
	                        'url': Config.atgHost + '/mobile/profile/addressList.jsp',
	                        'type':'GET',
	                        "isNeedLoading":"N"
	                })
                }                
                // navigator.gome.util.nativeUtils.getUserInfo(function(data){
                // 	data = typeof data == 'string' ? JSON.parse(data) : data
                // 	self.userInfo = data
                // })
                $g.getUserInfo()
                	.then(function(data){
	                	self.userInfo = data
	                }).catch(function(){
	                	// $g.login()
	                })
                if(this.oriAddress && this.oriAddress!== null){
                	this.isAble = false
                }
			},
			methods:{
				isEmptyObject:function(obj){
					var key
					for(key in obj)
						return !1;
					return !0
				},
				changeAddress:function(){
					var self = this;
					if(Config.platform == 'wap'){
						// WAP 跳到收货地址列表页面
						window.location.href=Config.jrHost + "/duobao_receiving_address.html?packageNo=" + self.pdInfo.packageNo
					}else{
						navigator.gome.util.nativeUtils.getConsigneeAddress(function(address){
							if(address){
								address = typeof address == "object" ? address : JSON.parse(address);
								self.oriAddress = address;
								
							}else{
								console.log('false')
							}
						})
					}
				},
				onClick:function(){
					var self = this
					var sourceData = QueryParser.parse(window.location.search)
				    //调用埋码
				    var maima = {
				        "pageName": "我的国美:我的夺宝:添加收货地址",
				        "channel": "我的夺宝",
				        "prop1": "我的国美:我的夺宝:添加收货地址",
				        "prop2": "我的国美:我的夺宝:添加收货地址",
				        "prop3": "我的国美:我的夺宝:添加收货地址",
				        "prop4": "我的国美:我的夺宝:添加收货地址",
				        "prop6": "我的国美:我的夺宝",
				        "prop27": sourceData.prePageName ,
				    }
				    navigator.gome.util.nativeUtils.getMeasure(maima);; 
					if(self.oriAddress){
						Docode.request(function(data){
							data = typeof data === 'string' ? JSON.parse(data) : data
				            var result = data.encReqInfo
				            if(result.isSuccess && result.isSuccess == 'Y'){
								window.history.back();
								self.$emit('addAddressDone',result)
								history.replaceState(null,'',location.href.split('#')[0]);
								window.ad_arr = []
								if(Config.platform == 'wap')
									location.search = location.search.substring(0,location.search.indexOf('&ad_info'))
				            }else{
				            	navigator.gome.util.nativeUtils.showToast(result.resDesc);
				            }
						}, function(data){
							if(data){
								data = typeof data === 'string' ? JSON.parse(data) : data
				            	navigator.gome.util.nativeUtils.showToast(data.resDesc);
							}else{
				            	navigator.gome.util.nativeUtils.showToast('请求失败');
							}
						},{
	                        "systemNo": Config.systemNo,
	                        "version": Config.version,
	                        "reqType": "P1000000014",
	                        'consigneeId': self.oriAddress.id,
		                    'provinceNm': self.oriAddress.provinceName,
		                    'provinceCode': self.oriAddress.provinceId,
		                    //二级 市
		                    'cityNm': self.oriAddress.cityName,
		                    'cityCode': self.oriAddress.cityId,
		                    //三级 区
		                    'countyNm': self.oriAddress.districtName,
		                    'countyCode': self.oriAddress.districtId,
		                    //四级 镇
		                    'address4Nm': self.oriAddress.townName,
		                    'address4Code': self.oriAddress.townId,
		                    //详细地址
		                    'consignerAddr': self.oriAddress.address,
		                    'consignerNm': self.oriAddress.name,
		                    'consignerMobile': self.oriAddress.mobile,
		                    'isDefault': self.oriAddress.isDefault,
		                    'userNo': self.userInfo.profileId,
		                    'packageNo': self.pdInfo.packageNo
						})
					}else{
						return false
					}
				}
			},
			events:{
				
			}
		})
	)
</script>
<style lang="less">
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/var.less';
	@import '../../less/duobao.less';
	.sh-address{
		.module();
		background: #fff url(../../images/borderbg.jpg) repeat-x bottom;
		background-size: 0.98rem auto;
		box-sizing: border-box;
		padding: .28rem 0.46rem .2rem;
		min-height: 1rem;
		height: auto;
		position: relative;
		&.has-address{
			display: block;
		}
		&:after{
			content: "0";
		    position:absolute;
		    right: .2rem;
		    top: 50%;
		    display: block;
		    font-family: "gome_icon";
		    font-size: @font-nm;
		    color: @gray-light;
		    transform: translateY(-50%) rotate(180deg);
		    -webkit-transform: translateY(-50%) rotate(180deg);
		    -moz-transform: translateY(-50%) rotate(180deg);

		    
		    -ms-transform: translateY(-50%) rotate(180deg);
		}
		.info{
		    font-size: @font-lg-sm;
		    font-weight: bold;
		    color: @gray-dark;
		    margin-bottom: 0.1rem;
		    .name{
		    	margin-right: .4rem;
		    }
		}
		.address{
		    color: @gray-light;
		    word-break: break-all;
		    font-size: .3rem;
		    line-height: 1.5;
		    .default{
		    	display: inline-block;
			    font-size: @font-sm;
			    color: @red;
			    padding: .02rem .06rem;
			    border-radius: 2px;
			    border: 1px solid #ff5c5c;
			    line-height: .22rem;
			    box-sizing: border-box;
			    margin-right: .06rem;
		    }
		}
		.desc{
			color: @gray-light;
		    word-break: break-all;
		    font-size: (@font-nm - 0.02);
		}
	}
	.product{
		.flexbox();
		padding: .3rem;
		.container{
			background-color: transparent!important;
			background-image: none!important;
		}
		img{
			width: 1rem;
		    height: 1rem;
		    margin-right: .2rem;
		    border: 1px solid @duobao-border;
		}
		.info{
			.flexitem(1);
			.flexbox();
			.title{
				.set-ellipsis-line(2);
				color: @gray;
				font-size: (@font-nm - 0.02);
				line-height: 1.5;
			}
		}
	}
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
		    &.disabled{
		    	background: @gray-lighter;
		    }
		}
	}
</style>