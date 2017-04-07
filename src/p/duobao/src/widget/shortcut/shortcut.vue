<template>
    <ul class="shortcut flexbox">
        <li class="item flex1" v-for="(index,item) in data">
           <a :href="item.href">
                <div class="img_box">
                    <!-- <img :src="{{item.imgPath}}"> -->
                    <img :src="item.imgPath">
                </div>
                <p class="title">{{item.menuName}}</p>
           </a>
        </li>
    </ul>
</template>
<script>
    export default (
        Vue.extend({
            data:function(){
                return{
                    
                }
            },
            created:function(){
              
            }
        })
    )
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/var.less';
     @import '../../less/duobao.less';
    .shortcut {
        .module();
        background: @white;
        padding: 0.22rem 0;
        .item {
            font-size: .22rem;
            text-align: center;
            .img_box{
                width: 100%;
                img{
                    width: .62rem;
                    margin: auto;
                }
            }
            .title{
                color: @gray-light;  
                .set-line-height(1,@font-sm*2)
            }
        }
    }
</style>