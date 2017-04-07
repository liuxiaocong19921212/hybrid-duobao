<template>
    <div class="compute">
    <p class="title">如何计算？</p>
    <p class="formula" v-if="data.packageInfo.luckyNum==''"><span class="unknown">?</span> = <span>{{data.packageInfo.fixNum}}</span> + <span class="change">数值A</span></p>
    <p class="formula" v-else><span>{{data.packageInfo.luckyNum}}</span> = <span>{{data.packageInfo.fixNum}}</span> + <span class="change">{{data.packageInfo.variableNum}}</span></p>
    <p class="note"><span>本期幸运号码</span> <span>固定数值</span> <span class="change">变化数值</span></p>
    <p class="title"><span class="change">变化数值</span>是取下面公式的余数</p>
    <p class="formula remainder"><span class="number" v-if="data.packageInfo.luckyNum==''">数值B</span><span v-else>{{data.packageInfo.orderTotalTime}}</span> ÷ <span>{{data.packageInfo.totalNum}}</span></p>
    <p class="note timeSum"><span>100个时间求和</span><span>总需人数</span></p>
    </div>
</template>
<script>
    export default(
            Vue.extend({

            })
    )
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/var.less';
    .compute{
        background:@white;
        padding-left: @font-sm*1.5;
        margin-bottom: @font-sm;
        .title{
            font-size: @font-nm;
            color: @gray-dark;
            padding: (@font-sm*2) 0;
            border-top: 1px solid @duobao-border;
        }
        .formula{
            font-size: @font-lg;
            color: @gray-light;
            margin-bottom: @font-sm*1.5;
            span{
                color: @duobao-red;
                font-size: @font-sm *2.2;
            }
            .unknown{
                padding: 0 (@font-sm *2.5) 0 (@font-sm *4);
            }
            .number{
                padding: 0 @font-sm 0 (@font-sm*2) ;
            }
        }
        span.change{
            color:@yellow;
        }
        .note{
            font-size: @font-nm-sm;
            color:@gray-light;
            padding-bottom: @font-sm*2;
            span{
                padding: 0 (@font-sm*3) 0 @font-sm;               
            }
            &.timeSum{
                span:last-child{
                    padding-left: @font-sm*4;
                }
            }
        }
        .remainder{
            span{
                color: @gray-light;
            }
        }
    }
</style>