<template>
    <div class="product-list order-detail record-list">
        <record-list :list="list"></record-list>
        <div v-show="nomore" class="loading box center">
            没有更多了
        </div>
        <div v-show="loading" class="loading box center">
            加载中...
        </div>
    </div>
</template>
<script>
    /**
     * 用户参与记录
     */
    import Docode from 'docode'
    import Config from 'config'
    import comps from 'components'
    import recordList from '../record_list/record.item.vue'
    import Loadmore from '../../utils/loadmore.vue'
    export default (
        Vue.extend({
            mixins: [Loadmore],
            components:{
                'record-list': recordList
            },
            events: {
                /**
                 * 发起加载下一个分页的请求
                 * @param  {Boolean} fromSelf 是否是自己发起的加载，而不是通过loadmore的事件发起的
                 * @return null
                 */
                loadNextPage: function(fromSelf,isNeedLoading){
                    Docode.request(this.loadMore,this.loadMoreFailed,{
                        'systemNo': Config.systemNo,
                        'version': Config.version,
                        'reqType': 'P1000000004',
                        'curPage': String(this.page),
                        'packageNo': this.sourceData.packageNo,
                    }, isNeedLoading)
                }
            },
            methods: {
                getResultList: function(data){
                    return data.orderInfoList
                }
            }
        })
    );
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../less/var.less';
    @img-size: 1rem;
    @fz: @font-nm-sm;
    .order-detail.product-list {
        background-color: @white;
        .loading {
            color: @gray;
            font-size: @fz;
            .set-line-height(1;@fz * 2);
        }
    }
</style>