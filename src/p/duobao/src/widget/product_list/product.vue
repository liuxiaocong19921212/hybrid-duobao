/**
 * 商品列表中的单个的商品组件
 * @Author: zhaoye-ds1
 * @Date:   2016-07-30 16:11:37
 * @Last Modified by: liuxiaocong
 * @Last Modified time: 2017-03-07 10:54:16
 */
<template>
    <li>
        <product :data="data">
            <div class="content-body" slot="content">
                <h4 class="title">{{data.packageShowNm}}</h4>
                <div class="subinfo">
                    <div class='subinfo-content'>
                        <div class="win-text" v-if="data.apiPackageStat == states.WIN">
                            <p>幸运号码：<em>{{data.lotteryInfo.luckyNum}}</em></p>
                            <p>我已参与：{{data.buyLotteryTimes}}人次</p>    
                        </div>
                        <p class="text" v-else>我已参与：{{data.buyLotteryTimes}}人次</p>
                    </div>
                    <a class="more-info" :href="hrefNumber">
                        <em v-if="data.apiPackageStat == states.WIN">查看全部</em>
                        <em v-else>查看号码</em>
                    </a>
                </div>
                <i v-if="data.apiPackageStat == states.WIN" class="seal"></i>
            </div>
        </product>
        <div class="product-bottom-info">
            <div class="content">
                <div class="info-container">
                    <p class="counter" v-show="isTimerShow == true" v-if="data.apiPackageStat == states.SOON">
                        <span>揭晓倒计时</span><timer :time-left="data.leftPublishedTime * 1000"></timer>
                    </p>
                    <div class="lotteryInfo" v-if="data.apiPackageStat == states.DONE">
                        <p>幸运号码：<em>{{data.lotteryInfo.luckyNum}}</em></p>
                        <p>获奖者：{{data.lotteryInfo.loginId}}</p>
                        <p>参与{{data.lotteryInfo.totalBuyLotteryTimes}}人次</p>
                    </div>
                    <div class="progress" v-if="data.apiPackageStat == states.DOING">
                        <div class='bar'>
                            <div class="rate" style="width:{{data.finishRate*100+'%'}}"></div>
                        </div>
                        <div class="info">
                            <p>总需{{data.totalNum}}人次</p>
                            <p>剩余<em>{{data.leftNum}}人次</em></p>
                        </div>
                    </div>
                    <span class="tip"  v-if="data.apiPackageStat == states.WIN && data.fillAddressFlag == ADDRESS_states.OUTDATE">奖品已过期，请<a @click="contactService">联系客服</a></span>
                </div>
                <div class="button-container">
                    <btn  @click="checkResult" v-show="canCheckResult == true" v-if="data.apiPackageStat == states.SOON" class="check-result reverse">查看结果</btn>
                    <btn @click="showAddress" v-if="data.apiPackageStat == states.WIN && data.fillAddressFlag == ADDRESS_states.NOT_FILL" class="gray reverse">添加收货地址</btn>
                    <btn @click="hrefLogistics" v-if="data.apiPackageStat == states.WIN && data.fillAddressFlag == ADDRESS_states.FILLED" class="check-logistics reverse">查看物流信息</btn>
                    <!--<btn :href="hrefDetailAgain" v-if="data.apiPackageStat != states.DOING && data.nextPackageNo && data.nextPackageNo != data.packageNo" class="buy-again reverse">再次购买</btn>
                    <btn :href="hrefDetail" v-if="data.apiPackageStat == states.DOING" class="more reverse">追加</btn>-->
                </div>
            </div>
        </div>
    </li>
</template>
<script>
    import comps from 'components'
    import Docode from 'docode'
    import Config from 'config'
    export default ({
        props: ['data','states','u'],
        components: {
            'product': comps.Product.Default,
            'btn': comps.Button,
            'timer': comps.Timer.Default,
        },
        data: function(){
            return {
                ADDRESS_states: {
                    NOT_FILL: '0',
                    FILLED: '1',
                    OUTDATE: '2'
                },
                isTimerShow: false,
                canCheckResult: false
            }
        },
        computed: {
            hrefDetail: function(){
                return Config.jrHost + '/hybrid/duobao/detail.html?packageNo=' + this.data.packageNo+'&from=me'+'&prePageName=国美金融:一元夺宝:我的夺宝'
            },
            hrefNumber: function(){
                return Config.jrHost + '/hybrid/duobao/number_detail.html?packageNo=' + this.data.packageNo + '&loginId=' + this.$parent.userInfo.userName + '&userNo=' + this.$parent.userInfo.profileId + '&from=me' + '&prePageName=国美金融:一元夺宝:我的夺宝'
            },
            hrefDetailAgain: function(){
                return Config.jrHost + '/hybrid/duobao/detail.html?packageNo='+this.data.nextPackageNo + '&prePageName=国美金融:一元夺宝:我的夺宝'

            }
        },
        created: function(){
            this.data.imageUrl = this.data.imgPath
            if(this.data.lotteryInfo.userNo == this.$parent.userInfo.profileId && this.data.apiPackageStat == this.states.DONE){
                this.data.apiPackageStat = this.states.WIN
            }
            if(Number(this.data.leftPublishedTime) > 0){
                this.isTimerShow = true
            }
        },
        events: {
            timerEnd: function(){
                this.isTimerShow = false
                this.canCheckResult = true
            },
            addAddressDone: function(pdInfo){
                if(pdInfo.packageNo == this.data.packageNo){
                    this.data.fillAddressFlag = this.ADDRESS_states.FILLED
                }
                this.data.othSysOrderNo = pdInfo.othSysOrderNo
            }
        },
        methods: {
            checkResult: function(){
                Docode.request(this.getResultDone,new Function,{
                                            'systemNo': Config.systemNo,
                                            'version': Config.version,
                                            'reqType': 'P1000000007',
                                            'orderLoginIn': this.$parent.userInfo.userName || this.$parent.userInfo.loginName,
                                            'packageNo': this.data.packageNo,
                                            'orderUserNo': this.$parent.userInfo.profileId
                })
            },
            contactService: function(){
                new comps.Alert.Default({
                    data: {
                        'content': '4008-708-708',
                        'cancel': '取消',
                        'ok': '呼叫',
                    },
                    events: {
                        ok: function(){
                            navigator.gome.util.nativeUtils.openDeviceTool(
                                function(){},function(){},{
                                    type: 'tel',
                                    content: '4008708708'
                            })
                        }
                    }
                })
                /**/
            },
            getResultDone: function(data){
                data = typeof data === 'string' ? JSON.parse(data) : data
                var result = data.encReqInfo
                if(!result.packageInfo.lotteryInfo.userNo)return;
                //更新状态
                for(var key in this.data){
                    if(result.packageInfo[key]){
                        this.data[key] = result.packageInfo[key]
                    }
                }
                this.data.lotteryInfo = result.packageInfo.lotteryInfo

                if(result.packageInfo.lotteryInfo.userNo == this.$parent.userInfo.profileId){
                    this.data.apiPackageStat = this.states.WIN
                }else{
                    this.data.apiPackageStat = this.states.DONE
                }
            },
            showAddress: function(){
                this.$dispatch('showAddress',this.data)
            },
            hrefLogistics: function(){
                if(Config.platform != 'wap'){
                    window.location.href =  Config.jrHost + '/duobao_ordertrace-' + (this.data.lotteryInfo.orderNo || 'null') + '.html'
                }else
                    window.location.href = Config.jrHost + '/duobao_logistics.html?orderNo=' + this.data.lotteryInfo.orderNo
            }
        }
    })
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../less/var.less';
    @font-title: @font-nm - 0.02rem;
    @font-content: @font-nm-sm;
    @font-timer: .4rem;
    .product {
        position: relative;
        .seal{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: .12rem;
            right: .12rem;
            z-index: @z-nm + 100;
            background: url("../../images/seal.png") no-repeat;
            background-size: contain;

        }
    }
    .product>a{
        &.react{
            .flexbox();
            height: auto;
        }
        .flexbox();
        font-size: @font-nm-sm;
        width: 100%;
        .container {
            &.content {
                .content-body {
                    /*height: 100%;*/
                }
                .flexitem(1);
                .title {
                    .set-line-height(2; @font-title + .1rem;);
                    .set-ellipsis-line(2);
                    margin-bottom: .05rem;
                    color: @gray;
                    font-size: @font-title;
                }
            }
            img {
                width: 1rem;
                height: 1rem;
            }
        }
        .subinfo {
            /*overflow: hidden;*/
            position: relative;
            .flexbox();
            color: @gray-light;
            .subinfo-content {
                .flexitem(1);
                .win-text {
                    p {
                        color: @gray;
                        .set-line-height(1; @font-content * 1.3;);
                        em {
                            color: @red;
                        }    
                    }
                }
            }
            .more-info {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                display: block;
                height: auto;
                min-width: @font-content * 5;
                em {
                    display: inline;
                    position: absolute;
                    bottom: 0;
                    color: @blue;
                }
            }
        }
    }
    .product-bottom-info {
        margin-bottom: .2rem;
        font-size: @font-content;
        background-color: @white;
        color: @gray;
        .content {
            .flexbox();
            border-top: 1px solid @duobao-border;
            margin-left: .3rem;
            padding: .2rem .3rem .2rem 0;
            .info-container {
                .flexitem(1);
                .flexbox();
                .flexbox.v_center();
                padding-right: .2rem;
                .counter {
                    .flexbox();
                    .flexbox.v_center();
                    >span {
                        position: relative;
                        transform: translateY(25%);
                    }
                    .timer {
                        padding-left: .2rem;
                        -webkit-transform: translateY(10%);
                        transform: translateY(10%);
                        color: @duobao-red;
                        font-size: @font-timer;
                    }    
                }
                .lotteryInfo {
                    p {
                        .set-line-height(1; @font-content * 1.3;);
                    }
                    em {
                        color: @duobao-red;
                    }
                }
                .progress {
                    width: 100%;
                    .bar {
                        width: 100%;
                        height: @font-sm / 2;
                        background-color: @duobao-border;
                        margin-bottom: @font-sm;
                        border-radius: @font-sm / 2;
                        .rate{
                            height: 100%;
                            background-color:@duobao-red;
                            border-radius: @font-sm / 2;
                        }
                    }
                    .info {
                        .flexbox();
                        p {
                            color: @gray-light;
                            &:nth-child(2){
                                text-align: right;
                            }
                            .flexitem(1);
                            em {
                                color: @duobao-red;
                            }    
                        }
                    }
                }
                .tip {
                    color: @gray-light;
                    a {
                        color: @blue;
                    }
                }
            }
            .button-container {
                
                .btn {
                    min-width: 1.7rem;
                    text-align: center;
                    margin-left: .2rem;
                    .set-line-height(1; .56rem;);
                    &.gray {
                        color: @gray !important;
                        border-color: @duobao-border !important;
                    }
                }    
            }
        }
    }

</style>