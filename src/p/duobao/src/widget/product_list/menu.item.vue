<template>
	<li :class="{active : isCur}" @click="onClick($event)">
		<span :data-code="data.statusCode">{{data.statusNa}}</span>
	</li>
</template>
<script>
	export default(
		Vue.extend({
			props:['data','idx'],
			data:function(){
				return{
					isCur:false
				}
			},
			created:function(){
				if(!!this.isCur){
	                this.$dispatch('clickRespond',this.idx,event)
	                this.isCur = true;
	            }
	            if(this.data.isCur)
                	this.isCur = this.data.isCur
			},
			events:{
				reset:function(){
 					this.isCur = false;
				},
			},
			methods:{
				onClick:function(event){
					this.$dispatch('clickRespond',this.idx,event);
                	this.isCur = true;
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
	.tab-menu li{
		.flexitem(1);
		text-align: center;
		font-size: @font-nm;
		color: @gray;
		.set-line-height(1;@font-sm * 4);
		span{
			display: inline-block;
			height: 100%;
			position: relative;
			.icon{
				display:inline-block;
				border: .1rem solid transparent;
				border-top-color:  @gray;
				height: .1rem;
			    border-bottom: none;
			    position: absolute;
			    top: 50%;
			    right: -0.4rem;
			    margin-top: -.05rem;
			}
			.rotated{
				transform:rotate(180deg);
			}
		}
		&.active span{
			color: @red;
			border-bottom: .04rem solid @red;
		}

		&:last-child{
			padding-right: .4rem;
		}
	}
</style>