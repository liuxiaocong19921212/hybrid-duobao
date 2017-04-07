<template>
	<div  v-if="data.imageList.length > 0">
		<div class="img-container" v-for="item in data.imageList">
			<img v-lazyload:="item.imgPath" src="data:image/gif;base64,R0lGODlhAwABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5ODc5MkU1OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5ODc5MkU2OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk4NzkyRTM5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTk4NzkyRTQ5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAAwABAAACAoQLADs=">
		</div>
	</div>
	<div v-else class="norecord box center">
		<p>暂无商品图文详情</p>
	</div>
</template>
<script>
	export default(
		Vue.extend({
		})
	)
</script>
<style lang="less">
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	.img-container {
		/*background-image: url(../../images/default_bg.png);*/
		/*background-repeat: no-repeat;*/
		/*-webkit-background-size: 100% 100%;*/
		/*background-size: 100% 100%;
		background-position: 0 0;*/
	}
	.norecord{
		font-size: @font-nm-sm;
        color: @gray-light;
        .set-line-height(1;@font-nm-sm*2);        
        text-align: center;
        min-height: 3rem;
	}
</style>