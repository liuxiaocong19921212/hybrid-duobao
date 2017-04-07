<template>
    <div class="luck-rank">
        <ul class="item-list">
            <li class="item" v-for="item in list">
                <a class="info" :href="host + '/hybrid/duobao/detail.html?packageNo='+ item.packageNo + '&prePageName=幸运榜单&source=luckyList'">
                    <div class="img-container">
                        <img :src="item.imgPath">
                    </div>
                    <div class="content">
                        <p class="username">{{item.userNo}}</p>
                        <p class="produce"><span class="number">{{item.totalBuyLotteryTimes}}</span>人次夺得{{item.packageNm}}</p>
                        <span class="total">总需：{{item.totalNum}}人</span>
                        <span class="datatime">{{item.publishedTime}}</span>
                    </div>
                </a>
            </li>
            <div v-show="nomore" class="loading box center">
                没有更多了
            </div>
            <div v-show="loading" class="loading box center">
                加载中...
            </div>
        </ul>
    </div>
</template>
<script>
    import Config from 'config'
    import Docode from 'docode'
    import comps from 'components'
    import Loadmore from '../../utils/loadmore.vue'
    export default (
            Vue.extend({
                mixins: [Loadmore],
                data: function(){
                    return {
                        host: Config.jrHost
                    }
                },
                events: {
                    loadNextPage: function(fromSelf,isNeedLoading){
                        Docode.request(this.loadMore,this.loadMoreFailed,
                        {
                            'systemNo': Config.systemNo,
                            'version': Config.version,
                            'reqType': 'P1000000002',
                            'curPage': String(this.page),
                        })
                    }
                },
                methods: {
                    getResultList: function(data){
                        return data.luckyList
                    },
                }
            })
    );
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/var.less';
    @fz: @font-nm-sm;
    .luck-rank{
        padding-left: .3rem;
        .item{
            border-top: 1px solid @duobao-border;
            height: @font-sm * 9;
            .info{
                display: block;
                padding: .3rem .3rem .3rem 0;
                .content{
                    padding-left: @font-nm-sm;
                    font-size: @font-nm-sm;
                    color: @gray-light;
                    overflow: hidden;
                    .username{
                        font-size: @font-nm;
                        color: @gray-dark;
                    }
                    .produce{
                        margin: @font-sm 0;
                        .ellipsis();
                        .number{
                            color: @duobao-red;
                        }
                    }
                    .datatime{
                        float: right;
                    }
                }
                .img-container {
                    width: @font-sm*6;
                    height: @font-sm*6;
                    overflow: hidden;
                    float: left;
                    border: 1px solid @duobao-border;
                    box-sizing: border-box;
                    background-image: url(../../images/default_bg.png);
                    background-size: 100% 100%;
                    background-position: no-repeat;
                }
            }
        }
        .loading {
            margin-left: -.3rem;
            background-color: #f2f2f2;
            color: @gray;
            font-size: @fz;
            .set-line-height(1;@fz * 2);
        }
    }
</style>