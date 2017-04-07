<template>
    <div class="info">
        <p class="title">{{data.packageInfo.packageNm}}</p>
        <p class="content">期号：{{data.packageInfo.timesNum}}</p>
        <p v-if="data.packageInfo.publishedTime" class="content">揭晓时间：{{data.packageInfo.publishedTime}}</p>
        <p v-if="data.packageInfo.lotteryInfo.luckyNum" class="content">本期幸运号码：<span class="luck-number">{{data.packageInfo.lotteryInfo.luckyNum}}</span></p>
    </div>
    <div class="detail">
        <p class="join">
            <span v-if="isFromMyself">我</span><span v-else>{{loginId}}</span>参与了<em><span v-if="data.buyLotteryTimes">{{data.buyLotteryTimes}}</span><span v-else>0</span></em>人次
        </p>
        <div id="lotteryList">
            <div class="datatime" v-for= "joinList in list">
                <p class="time">参与时间：{{joinList.orderTime}}</p>
                <div class="number">
                    <span  v-for="item in joinList.lotteryNoList">{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QueryParser from 'queryparser'
import Docode from 'docode'
import Config from 'config'
import Loadmore from '../../utils/loadmore.vue'

    export default(
            Vue.extend({
                mixins: [Loadmore],
                data: function(){
                    return {
                        loginId: '',
                        loadmoreHeight: 200,
                        page: 1
                    }
                },
                created: function(){
                    this.loginId = decodeURI(QueryParser.parse(window.location.search).loginId)
                },
                events: {
                    /**
                    * 发起加载下一个分页的请求
                    * @param  {Boolean} fromSelf 是否是自己发起的加载，而不是通过loadmore的事件发起的
                    * @return null
                    */
                    loadNextPage: function(fromSelf,isNeedLoading){
                        Docode.request(this.loadMore,this.loadMoreFailed,
                        {
                            'systemNo': Config.systemNo,
                            'version': Config.version,
                            'reqType': 'P1000000007',
                            'orderLoginIn': this.sourceData.loginId,
                            'packageNo': this.sourceData.packageNo,
                            'orderNo': this.sourceData.orderNo || "",
                            'orderUserNo': this.sourceData.from == 'me' || 'prize' ? this.sourceData.userNo : '',
                            'curPage': String(this.page),
                            'pageSize':'100'
                        },isNeedLoading)
                    }
                },
                methods: {
                    getResultList: function(data){
                        return data.lotteryNoList
                    }
                }
        })
    )
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../less/var.less';

    .info{
        background-color: @white;
        padding: (@font-sm*2) (@font-sm*1.5);
        .title{
            font-size: @font-sm*1.5;
            color:@gray-dark;
            line-height:@font-sm*2.1;
        }
        .content{
            font-size: @font-nm;
            color:@gray-light;
            margin-top: @font-nm-sm;
            .luck-number{
                color:@duobao-red;
            }
        }
    }
    .detail{
        background-color: @white;
        padding-left: @font-sm *1.5;
        margin-top: @font-sm;
        .join{
            font-size: @font-nm;
            height: @font-nm*3;
            line-height: @font-nm*3;
            em{
                color:@duobao-red;
            }
        }
        .datatime{
            padding: @font-sm*1.5 0;
            font-size: @font-nm-sm;
            border-top: 1px solid @duobao-border;
            .time{
                color:@gray;
            }
            .number{
                span{
                    margin-top: @font-nm;
                    margin-right: @font-nm;
                    display: inline-block;
                    font-size: @font-nm-sm;
                    color: @gray-light;
                }
            }
        }
        
    }



</style>