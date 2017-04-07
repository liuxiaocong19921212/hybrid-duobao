<template>
    <div  v-show="isShow" transition="bg" class="order-dialog-container" @click.self="back">
        <div v-show="isShow" transition="content" class="order-dialog">
            <div class="title">
                <div class='icon-container'>
                    <img :src="data.packageInfo.imgPath" onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='">
                </div>
                <h4>{{data.titleDesc}}</h4>
                <i class="close" @click.self="back" data-icon="&#x0042"></i>
            </div>
            <div class="content">
                <div class="option-container">
                    <span class="option" @click="selectOne(index,item.lotteryNum)" v-for="(index, item) in data.lotteryNumList">
                        {{item.lotteryNumNa}}
                    </span>
                </div>

                <div class="counter">
                    <i @click="minus" class="minus sign" data-icon="&#x005e"></i>
                    <input class="input" type="number" v-model="buyNumber"  @change="onChange" @focus="onFocus" @input="onChange" @blur="onBlur">
                    <i @click="plus" class="plus sign" data-icon="&#x005d"></i>
                </div>
                <em class="tips">获得几率{{((buyNumber / data.packageInfo.totalNum)*100).toFixed(2)}}%</em>
                <p class="tips">{{data.markDesc}}</p>
            </div>
            <div class="btn-container">
                <btn class="default" @click="onClick">立即夺宝</btn>
            </div>
        </div>
    </div>
</template>
<script>
    import Docode from 'docode'
    import Config from 'config'
    import comps from 'components'
    import QueryParser from 'queryparser'
    export default (
        Vue.extend({
            data: function(){
                return {
                    buyNumber: 1,
                    scrollY: 0,
                    isShow: false
                }
            },
            components: {
                'btn': comps.Button
            },
            created: function(){
                this.$watch('buyNumber',function(val){
                    val = Number(val)
                    if(val < 0 || val == ''){
                        this.buyNumber = 1
                    }
                    if(this.data && val > Number(this.data.packageInfo.leftNum)){
                        this.buyNumber = Number(this.data.packageInfo.leftNum)
                        navigator.gome.util.nativeUtils.showToast('剩余人次不足，当前剩余'+ this.data.packageInfo.leftNum +'人次');
                    }
                })
            },
            ready: function(){
                var self = this
                /*setInterval(function(){
                    self.$el.style.height = window.innerHeight + 'px'
                    self.$el.style.top = document.body.scrollTop + 'px'
                    self.$el.style.position = 'absolute'
                },500)*/
            },
            methods: {
                back: function(e){
                    
                    this.buyNumber = 1
                    if(document.querySelector('#gotop')){
                        document.querySelector('#gotop').style.visibility = 'visible'
                    }                   

                    if(window.navigator.userAgent.match(/iPad|iPhone/i)){
                        var self = this
                        setTimeout(function(){
                            self.isShow = false
                        }, 50)
                        this.scollToY();                        
                    } else{
                        this.isShow = false
                    }    
                },
                selectOne: function(idx,buyNumber){
                    this.buyNumber = Number(buyNumber)
                    var list = this.$el.querySelectorAll('.option')
                    for(var i=0; i<list.length; i++){
                        list[i].className = 'option'
                    }
                    list[idx].className = 'option active'
                },
                noActive:function(){
                    var list = this.$el.querySelectorAll('.option')
                    for(var i=0; i<list.length; i++){
                        list[i].className = 'option'
                    }
                },
                onChange:function(){
                    this.noActive();
                    var ele = this.$el.children.item(0).querySelector('.input');
                        ele.value = ele.value.replace(/[^\d]/g);
                    var val = ele.value;

                    if(this.data && Number(val) > Number(this.data.packageInfo.leftNum)){
                        this.buyNumber = Number(this.data.packageInfo.leftNum)
                        this.$el.children.item(0).querySelector('.input').value = Number(this.data.packageInfo.leftNum)
                    }
                },
                onFocus: function(){
                    if(window.navigator.userAgent.match(/iPad|iPhone/i) && window.navigator.userAgent.match(/mqqbrowser/i)){      
                        document.addEventListener('touchmove', this.noMove)
                    }              
                },
                onBlur:function(){
                    if(window.navigator.userAgent.match(/iPad|iPhone/i) && window.navigator.userAgent.match(/mqqbrowser/i)){      
                        document.removeEventListener('touchmove', this.noMove)
                    }  
                },
                noMove:function(e){
                    e.preventDefault();
                },
                minus: function(){
                    this.noActive();
                    this.buyNumber = Number(this.buyNumber)-1
                },
                plus: function(){
                    this.noActive();
                    this.buyNumber = Number(this.buyNumber)+1
                },
                onClick: function(){
                    var self = this
                    var query = QueryParser.queryify({
                        packageNo: this.data.packageInfo.packageNo,
                        buyMoney: this.buyNumber * Number(this.data.packageInfo.yygoGradeAmount),
                        buyLotteryTimes: this.buyNumber,
                        prePageName: this.pageName
                    })
                    Docode.request(function(data){
                        data = typeof data === 'string' ? JSON.parse(data) : data
                        var result = data.encReqInfo
                        if(result.isSuccess == 'N'){
                            navigator.gome.util.nativeUtils.showToast(result.resDesc || '请求失败')
                        }else{
                            if(result.enablePlaceOrder && result.enablePlaceOrder == '0'){
                                // self.isShow = false
                                // self.buyNumber = 1
                                navigator.gome.util.nativeUtils.showToast(result.resDesc)                                
                            }else{
                                window.location.href = Config.jrHost+'/hybrid/duobao/order_detail.html'+query
                            }
                        }
                    }, function(){
                        console.log('fail')
                    }, {
                        "systemNo": Config.systemNo,
                        "version": Config.version,
                        "reqType":"P1000000008",
                        'packageNo': this.data.packageInfo.packageNo,
                        "userNo": this.userNo,
                        "buyLotteryTimes":this.buyNumber,
                        "buyMoney": this.buyNumber * Number(this.data.packageInfo.yygoGradeAmount)
                    })
                },
                scollToTop:function(){                    
                    document.documentElement.style.height = "100%";
                    document.documentElement.style.overflow = "hidden";
                    document.body.style.height = "100%";
                    document.body.style.overflow = "hidden";
                    document.querySelector('.order-dialog-container').style.bottom = '0';
                    document.querySelector('.order-dialog-container').style.position = 'absolute';
                },
                scollToY:function(){
                    var scrollYsize = this.scrollY;
                    document.documentElement.style.height = "auto";
                    document.documentElement.style.overflow = "auto";
                    document.body.style.height = "auto";
                    document.body.style.overflow = "auto";
                    document.querySelector('.order-dialog-container').style.position = 'fixed';
                    window.scrollTo(0,scrollYsize)
                },
                show: function(){
                    this.scrollY = document.body.scrollTop;
                    if(window.navigator.userAgent.match(/iPad|iPhone/i)){
                        this.scollToTop();
                        var self = this
                        setTimeout(function(){
                            self.isShow = true
                        }, 50)
                        
                    }else{
                        this.isShow = true
                    }                  
                    if(document.querySelector('#gotop')){
                        document.querySelector('#gotop').style.visibility = 'hidden'
                    }
                }
            }
        })
    )
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/layout.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/duobao.less';
    @font-size: @font-nm-sm;
    @title-height: .9rem;
    @line-height: .6rem;
    @line-margin: .4rem;
    @radius: .02rem;
    .bg-transition {
        -webkit-transition: all .3s;
        transition: all .3s;
        background-color: rgba(0,0,0,.3);
    }
    .bg-enter,
    .bg-leave {
        background-color: rgba(0,0,0,0);
    }
    .content-transition {
        -webkit-transition: all .3s;
        transition: all .3s;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    .content-enter,
    .content-leave {
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
    }
    .order-dialog-container {
        z-index: @z-max - 100;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;   
        left: 0;
        .order-dialog {
            .flexbox();
            .flexbox.vertical();
            height: 5rem;
            width:  100%;
            position: absolute;
            bottom: 0;
            background-color: @white;
            text-align: center;
            .title {
                .flexbox();
                .set-line-height(1; @title-height);
                position: relative;
                border-bottom: 1px solid @duobao-border;
                margin-bottom: @line-margin;
                h4 {
                    .flexitem(1);
                    .set-line-height(1; @title-height);
                    font-size: @font-nm;
                }
                .icon-container {
                    width: 1.2rem;
                    height: 1.2rem;
                    border: 1px solid @duobao-border;
                    position: absolute;
                    bottom:  .2rem;
                    left: .3rem;
                    background: url(../../images/default_bg.png) no-repeat center center;
                    background-size: cover;
                    img {
                        height: 100%;
                    }
                }
                .close{
                    color: #333;
                    width: @title-height;
                    line-height: @title-height;
                    font-size: @font-nm;;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
            .content {
                .flexitem(1);
                padding: 0 .5rem;
                width: 100%;
                .option-container {
                    /*.flexbox();*/
                    .grid(4);
                    .set-line-height(1; @line-height);
                    margin-bottom: @line-margin;
                    text-align: left;
                    .option {
                        border: 1px solid @duobao-border;
                        border-radius: @radius;
                        text-align: center;
                        /*.flexitem(1);*/
                        &:not(:last-child){
                            margin-right: .2rem;
                        }
                        &.active {
                            color: @duobao-red;
                            border-color: @duobao-red;
                        }
                    }
                }
                .counter {
                    font-size: @font-size;
                    .set-line-height(1; @line-height);
                    .flexbox();
                    margin-bottom: .2rem;
                    input {
                        .flexitem(1);
                        text-align: center;
                        border: 1px solid @duobao-border;
                        border-radius: @radius;
                    }
                    .sign{
                        padding: 0 .3rem;
                    }
                }
                .tips {
                    .set-line-height(1; @line-margin);
                    font-size: @font-size;
                }
                em {
                    display: block;
                    color:  @duobao-red;
                }
            }
            .btn-container {
                width: 100%;
                border-top: 1px solid #d2d2d2;
                background-color: #f9f9f9;
                .flexbox();
                .btn {
                    .flexitem(1);
                    width: 100%;
                    margin: .1rem .2rem;
                }
            }
        }
    }
    
</style>