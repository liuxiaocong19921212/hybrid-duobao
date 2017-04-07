<template>
    <div v-show="list.length > 0" class="winner" v-if="sourceData!=''">
        <p class="title">本期选取100个参与时间如下:</p>
        <table>
            <tr>
                <th>用户账号</th>
                <th class="join-time">参与时间</th>
                <th>时间转数字</th>
            </tr>
            <tr  v-for="item in list">
                <td>{{item.userNo}}</td>
                <td>{{item.orderTime}}</td>
                <td>{{item.orderTimeNum}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Docode from 'docode'
    import Config from 'config'
    import comps from 'components'
    import Loadmore from '../../utils/loadmore.vue'
    export default (
            Vue.extend({
                data: function(){
                    return {
                        list: []
                    }
                },
                created: function(fromSelf,isNeedLoading){
                    Docode.request(this.ok
                    , function(){
                        console.log('fail')
                    }, {
                        'systemNo': Config.systemNo,
                        'version': Config.version,
                        'reqType': 'P1000000006',
                        'pageSize': String(100),
                        'packageNo': this.sourceData.packageNo,
                        'userNo': this.sourceData.userNo
                    })
                    
                },
                methods: {
                    ok: function(data){
                        data = typeof data === 'string' ? JSON.parse(data) : data
                        var result = data.encReqInfo
                        for(var i=0; i<result.userLotteryList.length; i++){
                            this.list.push(result.userLotteryList[i])
                        }
                     }
                }
            })
    );
</script>
<style lang="less">
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/var.less';

    .winner{
        background: @white;
        padding: 0 (@font-sm*1.5) (@font-sm*1.5);
        .title{
            font-size: @font-nm;
            color: @gray-dark;
            padding: (@font-sm*2) 0 (@font-sm*1.5);
        }
        table{
            width: 100%;
            border-top: 1px solid @duobao-border;
            border-right: 1px solid @duobao-border;
            tr{
                font-size: @font-nm-sm;
                color: @gray;
                th{
                    width: @font-sm *9.7;
                    height: @font-sm *2.5;
                    line-height: @font-sm *2.5;
                    background-color: #f1f9ff;
                    border-left:1px solid @duobao-border;
                    border-bottom:1px solid @duobao-border;
                }
                .join-time{
                    width: @font-nm*7;
                }
                td{
                    height: @font-sm *3.9;
                    border-left:1px solid @duobao-border;
                    border-bottom:1px solid @duobao-border;
                    text-align: center;
                    vertical-align: middle;
                    word-break: keep-all;
                }
            }

        }
    }
</style>