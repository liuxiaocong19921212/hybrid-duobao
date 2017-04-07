//用户参与记录
<template>
	<div v-for="item in list" class="item">
		<div class="face">
			<img :src="item.imgPath">
		</div>
		<div class="info">
			<p class="">
				<span class="name">{{item.loginIn}}</span>
				<span class="open_time">{{item.orderTime}}</span>
			</p>
			<p class="">
				{{item.clientip}}
			</p>
			<p class="">
				<span>参与了<em>{{item.buyLotteryTimes}}</em>人次</span>
				<a :href="numberHref(
								item.loginIn,
								item.userNo,
								item.orderNo,
								item.packageNo
								)" 
					class="see">查看号码</a>
			</p>
		</div>
	</div>
</template>
<script>
	import Config from 'config'
	import QueryParser from 'queryparser'
	import comps from 'components' 
	
	export default(
		Vue.extend({
			props:['list','isFrom'],
			components:{

			},
			data:function(){
				return{

				}
			},
			methods:{
				numberHref: function(loginId,userNo,orderNo,packageNo){
					var packageNo = QueryParser.parse(window.location.search)
					var _isfrom
					if(this.isFrom == 'me'){
						_isfrom = '&from=me';
					}else{
						_isfrom =''
					}
					return Config.jrHost + '/hybrid/duobao/number_detail.html?' + 'loginId='+loginId+'&userNo='+userNo+'&orderNo='+orderNo+'&packageNo='+packageNo.packageNo + _isfrom+'&prePageName=用户参与记录';
				}
			}
		})
	)
</script>
<style lang='less'>
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/var.less';
	@import '../../less/duobao.less';
	@link-color: @blue;//#197fe7;
	@font-size: @font-nm-sm;
	@img-size:1rem;
	.record-list{
		.item{
			.flexbox();
			position: relative;
			padding: @font-size .3rem @font-size 0;
			border-bottom: 1px solid @duobao-border;
			margin-left: .3rem;
			&:last-child{
				border-bottom: none;
			}
			.face{
				width: @img-size;
				/*height: @img-size;*/
				
				overflow: hidden;
				position: relative;
				.flexbox();
				.h_center();
				.v_center();
				img{
					width: @img-size;
					height: @img-size;
					border-radius: 100%;
				}
			}
			.info{
				.flexitem(1);
				padding-left: .2rem;
				font-size: @font-size;
				color: @gray;
				p{
					.set-line-height(1;@font-size*1.6;);
					.open_time{
						float: right;
					}
					.see{
						color: @link-color;
						float: right;;
					}
				}
				.seal{
					position: absolute;
				    right: 23%;
				    top: .1rem;
				    width: 1.2rem;
				    z-index: @z-nm;
				}
			}
		}
	}
</style>