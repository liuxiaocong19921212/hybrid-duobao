//detail.list.vue
<template>
	<ul class="list" v-if="data">
		<nav-item v-for="item in data" :data="item"></item>
	</ul>
</template>
<script>
	import comps from 'components' 
	import navItem from './detail.navItem.vue'
	export default(
		Vue.extend({
			components: {
				'navItem': navItem
			},
		})
	)
</script>>
<style lang="less">
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/var.less';
	@import '../../less/duobao.less';
	.list{
		.module();
		padding-left: .3rem;
		font-size: @font-nm;
		>li:not(:last-child){
			border-bottom: 1px solid @duobao-border;
		}
		>li{			
			position: relative;
			&:after{
				content: "0";
			    position:absolute;
			    right: .3rem;
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
			.item{
				padding:@font-nm @font-lg*2 @font-nm 0;
				color: @gray;
				.right{
					float: right;
					em{
						color: @duobao-red;
						font-size: (@font-nm + 0.02);
   						margin: 0 .05rem;
					}
				}
			}
		}
	}
</style>