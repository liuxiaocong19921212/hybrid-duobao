//detail.info.vue
<template>
	<div class="module_tit" v-if="data">
		<h3 class="title">{{data.packageInfo.packageShowNm}}</h3>
		<div class="btm_status"  v-if="data.packageInfo.apiPackageStat == STATUS.DOING">
			<!-- 普通商品状态  020:正在进行中-->
			<div class="progress">
				<!-- 进度条 -->
				<div class="rate_wrap">
					<span class="rate" :data-rate="data.packageInfo.finishRate" style="width:{{data.packageInfo.finishRate*100+'%'}}"></span>
				</div>
				<div class="data_wrap">
					<span>总需<em>{{data.packageInfo.totalNum}}</em>人次
						<i class="tips" @click="bubble">
							<em class="bubble_box" v-el:bubble style="display:none;">{{data.promptInfo}}</em>
						</i>
					</span>
					<span>剩余<em class="strong">{{data.packageInfo.leftNum}}</em>人次</span>
				</div>
			</div>	
		</div>
		<div class="btm_status"  v-if="data.packageInfo.apiPackageStat == STATUS.DONE">
			<!--  040:揭晓完成; -->	
			<div class="lottery">
				<div class="num">
					<p>
						<span>幸运号码</span><em class="special">{{data.packageInfo.lotteryInfo.luckyNum}}</em>
						<a class="icon icon-calc" :href="computeRule"></a>						
					</p>
					<p>
						<span>揭晓时间：</span><em>{{data.packageInfo.publishedTime}}</em>
					</p>
				</div>										
				<div class="winer">
					<div class="face"><img :src="data.packageInfo.lotteryInfo.imgPath"></div>
					<div class="info">
						<p >
							<span class="name">{{data.packageInfo.lotteryInfo.loginId}}</span>
							<span class="open_time">{{data.packageInfo.lotteryInfo.orderCreateTime}}</span>
						</p>
						<p >
							<span>{{data.packageInfo.lotteryInfo.clientip}}</span>
						</p>
						<p >
							<span>参与了<em>{{data.packageInfo.lotteryInfo.totalBuyLotteryTimes}}</em>人次</span>
							<a 
								:href="numberHref(
												data.packageInfo.lotteryInfo.loginId,
												data.packageInfo.lotteryInfo.userNo,
												data.packageInfo.lotteryInfo.orderNo,
												data.packageInfo.packageNo
												)"
								 class="see">
								 查看号码
							</a>
						</p>
					</div>
					<span class="seal"><img src="../../images/seal.png"></span>
				</div>
			</div>	
		</div>
		<div class="btm_status"  v-if="data.packageInfo.apiPackageStat == STATUS.SOON">
			<!--  030:即将揭晓 -->	
			<div class="status_box">
				<span class="text">揭晓倒计时</span>
				<div class="timer_box">
					<timer v-ref:timer :time-left="data.packageInfo.leftPublishedTime * 1000"></timer>
					<button class="seeresult" @click="reload"  v-el:btn>查看结果</button>
				</div>
				<a class="icon icon-calc" :href="computeRule"></a>
			</div>			
		</div>
	</div>
</template>
<script>
	import Config from 'config'
	import QueryParser from 'queryparser'
	import comps from 'components' 
	export default(
		Vue.extend({
			components:{
				'timer': comps.Timer.Default,
				'button': comps.Button,
			},
			data: function(){
				return{
					self_rate:'',
					startTime:0,
					STATUS: Config.STATUS
				}
			},
			created:function(){
				// this.setRate();
				this.startTime=new Date().getTime();
			},
			methods:{
				setRate:function(){
        			var rate ,finishRate ;
        			rate = Number(this.data.packageInfo.finishRate);
        			rate = rate > 1 ? 1 : rate;       			
        			finishRate = rate*100+'%';
        			this.self_rate=finishRate;
        		},
        		bubble:function(){
        			var bubble = this.$els.bubble;
        			if(bubble.style.display=='none'){
    					bubble.style.display="block"
    				}else{
    					return
    				}
        			var timer = setInterval(function(){
        				bubble.style.display="none";
        				if(bubble.style.display == "none"){
        					clearInterval(timer)
        				}
        			},3000)
        		},
				numberHref: function(loginId,userNo,orderNo,packageNo){
					var packageNo
					var	_isfrom
						packageNo =  QueryParser.parse(window.location.search)
					if(this.isFrom == 'me'){
						_isfrom = '&from=me';
					}else{
						_isfrom ='&from=prize'
					}
					return Config.jrHost + '/hybrid/duobao/number_detail.html?' + 'loginId='+loginId+'&userNo='+userNo+'&packageNo='+packageNo.packageNo + _isfrom+'&prePageName=详情页'
				},
				reload: function(){
					window.reload()
				}
			},
			events:{
				//倒计时结束 的回调
				timerEnd:function(){
					if(!this.$refs.timer.$el)return
					this.$refs.timer.$el.style.display="none"
					this.$els.btn.style.display="block"
				}
			}
		})
	);
</script>
<style lang='less'>
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/duobao.less';
	@import '../../less/var.less';
	.module_tit{
		border-top:1px solid @duobao-border;
		padding: .3rem 0 0;
		background: #fff;
		.module();
		.title{
			padding: 0 .3rem;
			font-size: @font-nm-sm;
			color: @gray-dark;
			line-height: 1.5;
			.set-ellipsis-line(2);
		}	
		.progress{
			padding: @font-nm/2 .3rem .3rem;
		    box-sizing: border-box;	
		    .rate_wrap{
				height: .06rem;

				height: .1rem;
				border-radius: .1rem;
				width: 100%;
				position: relative;
				background: #e6e6e6;
				margin-top: 0.2rem;
    			margin-bottom: .2rem;
				.rate{
					position: absolute;
					left: 0;
					top: 0;
					height: .06rem;
					border-radius: .06rem;

					height: .1rem;
					border-radius: .1rem;
					background: @duobao-red;
				}
			}
			.status{
				color: @duobao-red;
			    font-size: @font-nm-sm;
			    padding: @font-sm 0;
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
				em.strong{
					color: @duobao-red;
				}
				.tips{
					width: .3rem;
					height: .3rem;
					margin-left: .1rem;
					display: inline-block;
					background: url(../../images/icon-tips.png) no-repeat center center;
					background-size: 90% auto;
					vertical-align: sub;
				}
			}
			span:last-child{		
				text-align: right;
			}
			span:last-child{		
				text-align: right;
				em {
					color: @duobao-red;
				}
			}
			.bubble_box{
				position: absolute;
			    background: rgba(0,0,0,.7);
			    color: @white;
			    padding: .1rem;
			    border-radius: .05rem;
			    margin-top: .5rem;
			    margin-left: -.3rem;
			    margin-right: .3rem;
			    line-height: 1.2;
				z-index: @z-nm;
			    &:before{
			    	content: '';
			    	position:absolute;
			    	top: -12px;
				    border: 6px solid rgba(0, 0, 0, 0.7);
				    border-top-color: transparent;
				    border-left-color: transparent;
				    border-right-color: transparent;
				    left: .33rem;
			    }
			}
		}
		.lottery{
			padding-left: .3rem;
			.num{
				padding: @font-sm .3rem @font-sm 0;
				border-bottom: 1px solid #e6e6e6;
				font-size: @font-nm-sm;
				color: @gray-light;
				p{
					line-height: @font-sm*2;
					.open_time{
						float: right;
					}
				}
				.special{
					font-size: @font-sm * 3;
					color: @duobao-red;
					vertical-align: text-bottom;
   					display: inline-block;
   					margin-left: @font-sm;
				}
				em{
					margin: 0 .1rem 0 0;
					font-family: Arial;
				}
			}
			.winer{
				.flexbox();
				position: relative;
				padding: @font-sm .3rem @font-sm 0;
				.face{
					width: 1rem;
					border-radius: 100%;
					position: relative;
					overflow: hidden;					
					.flexbox();
					.h_center();
					.v_center();
					img{
						height: 1rem;
						width: 1rem;
						border-radius: 100%;
					}
				}
				.info{
					.flexitem(1);
					padding-left: .2rem;
					font-size: @font-nm-sm;
					color: @gray;
					z-index: @z-nm;
					p{
						.set-line-height(1;@font-nm-sm*1.6;);
						.open_time{
							float: right;
						}
						.see{
							color: #197fe7;
							float: right;;
						}
					}
				}
				.seal{
					position: absolute;
				    right: 23%;
				    top: .1rem;
				    width: 1.2rem;
				}
			}
		}
		/*倒计时状态*/
		.status_box{
			padding:  @font-sm @font-sm*1.5;
		    color:@gray-light;
			font-size: @font-nm-sm;
		    overflow: hidden;
		    line-height: .6rem;
			.text{
				float: left;
			    display: inline-block;
			    line-height: .8rem;
			    height: .56rem;
			}
			.timer_box{
				    display: inline-block;
				    float: left;
				    height: .6rem;
				    margin: 0 .2rem;
				.timer{
					color: @duobao-red;
					font-size: @font-sm*3;
	    			margin: 0 .1rem;
				}
				.seeresult{
					border: 1px solid @duobao-red;
				    border-radius: 3px;
				    width: 2.4rem;
				    text-align: center;
				    line-height: .56rem;
				    color: @duobao-red;
				    display: none;
				}
			}
		}
		.icon-calc{
				display: inline-block;
				background: url('../../images/calc.png') no-repeat center center;
				background-size: 100%;
				width: .4rem;
			    height: .4rem;
			    vertical-align: middle;
			    margin-bottom: .2rem;
			}
	}
	.hide{
		display: none!important;
	}
	.my_pagination{
		position: absolute;
	    right: .2rem;
	    color: @white;
	    font-size: @font-nm + 0.02rem;
	    line-height: 0.4rem;
	    margin-top: -.6rem;
	    background: rgba(0, 0, 0, 0.2);
	    border-radius: 0.4rem;
	    padding: 0.02px .2rem 0rem .2rem;
	    z-index: @z-nm + 10;
	    >span:first-child{
	    	color: @white;
    		font-size: .3rem;
	    }
	}
</style>