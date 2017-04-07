//本期参与用户
<template>
	<div class="join_list" v-if="data">
		<h3 class="theme_title">本期参与用户</h3>
		<div class="list_box" v-if="data.length > 0">
			<div class="record-list">
				<record-list :list="data.slice(0,3)" :isFrom="isFrom"></record-list>
			</div>
			<a v-if="data.length > 3" class="link" :href="href">查看全部参与记录</a>
		</div>
		<div v-else class="noman">
			<img src="../../images/noman.png">
			<p class="desc">还没有用户参与，快来当第一个夺宝勇士吧！</p>
		</div>
	</div>
</template>
<script>
	import comps from 'components' 
	import recordList from '../record_list/record.item.vue'
	export default(
		Vue.extend({
			components:{
				'record-list': recordList
			},
			data: function(){
				return{
					data:[],
				}
			},
			ready:function(){
				
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
	.join_list{
		.module();
		background: @white;
		.theme_title{
			padding :@font-nm @font-lg * 2 @font-nm 0;
			color: @gray;
			font-size: @font-nm;
			margin-left: .3rem;
			border-bottom: 1px solid @duobao-border;
		}
		.noman{
			text-align: center;
			color: @gray-light;
			font-size: @font-nm-sm;
			padding-bottom: 1rem;
			img {
				width: 2.2rem;
				margin:auto;
			}
		}
		.link {
			color: @link-color;
		    font-size: @font-nm-sm;
		    text-align: center;
		    display: block;
		    border-top: 1px solid #e6e6e6;
		    padding: @font-nm 0;
		    margin-left: .3rem;
		}
		.face {
			background-image: url(../../images/default_bg.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}
</style>