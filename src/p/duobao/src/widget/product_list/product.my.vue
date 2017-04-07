<template>
    <div v-show="show">
        <tab-nav-scroll :list="tabList" v-ref:tabNav :options="opt">
        </tab-nav-scroll>
        <div class="blocker"></div>
        <ul>
            <product :data="item" :states="STATUS"  v-for="item in list"></product>
        </ul>
        <div v-show="nomore == true" class="loading box center">
                没有更多了
        </div>
        <div v-show="loading == true" class="loading box center">
            加载中...
        </div>    
        <div v-show="noRecord == true" class="record">
            <div class="picture"></div>
            <div class="tips">
                <p v-show="curStatus === STATUS.ALL">您还没有夺宝记录</p>
                <p v-show="curStatus === STATUS.WIN">您还没有中奖的夺宝记录</p>
                <p v-show="curStatus === STATUS.DOING">您还没有正在进行的夺宝记录</p>
                <p v-show="curStatus === STATUS.SOON">您还没有即将揭晓的夺宝记录</p>
                <p v-show="curStatus === STATUS.DONE">您还没有已揭晓的夺宝记录</p>
                <!-- <p>现在去试试，也许下一个幸运用户就是你～</p> -->
            </div>
            <!--<btn :class="'default'" :href="href">去试试吧</btn>-->
        </div>
    </div>
</template>
<script>

    import Loadmore from '../../utils/loadmore.vue'
    import QueryParser from 'queryparser'
    import Docode from 'docode'
    import Config from 'config'
    import comps from 'components'
    import product from './product.vue'

    export default(
        Vue.extend({
            mixins: [Loadmore],
            components: {
                'tab-nav-scroll': comps.TabNavScroll,
                'swiper': comps.Swiper,
                'slider': comps.Slider,
                'timer': comps.Timer.Default,
                'btn': comps.Button,
                'product': product
            },
            data: function(){
                return {
                    loadmoreHeight: 400,
                    href: Config.jrHost + '/finance-duobao.html?prePageName=我的夺宝',
                    tabList: [{tagName:'全部'},{tagName:"中奖"},{tagName:"正在进行"},{tagName:"即将揭晓"},{tagName:"已揭晓"}],
                    noRecord: false,
                    list: [],
                    lastClickIdx:0,
                    options: {
                        type: 'free',
                    },
                    isFixexd:false,
                    STATUS: Config.STATUS,
                    curStatus: '010',
                    nomore: false,
                    loading: false,
                    totalPage: -1,
                    startTime: new Date().getTime(),
                    endTime: new Date().getTime()+10000,
                    opt: {
                        perSliders: 'auto'
                    }
                }
            },
            created: function(){

            },
            compiled:function(){
                var self = this
                if(Config.platform == 'wap'){
                    var $tabNav = self.$refs.tabnav.$el,
                        $blocker = $tabNav.parentElement.querySelector('.blocker');
                    $tabNav .style.position ="relative"
                    $blocker.style.height = '0'
                    window.addEventListener('scroll', function(){                      
                        var $height = $tabNav.offsetHeight,
                            $top = $blocker.offsetTop;
                        var ract = $blocker.getBoundingClientRect()
                        if(ract.top < 0){
                            $tabNav.style.position = 'fixed'
                            $blocker.style.height = '0.84rem'
                        }else{
                            $tabNav.style.position = 'inherit'
                            $blocker.style.height = '0'
                        }
                    })    
                }
                
            },
            events: {
                clickOne: function(idx){
                    if(idx === this.lastClickIdx)return
                    this.page = 1
                    this.lastClickIdx = idx
                    var code
                    switch(idx){
                        case 0:
                            code  = this.STATUS.ALL
                            break;
                        case 1:
                            code  = this.STATUS.WIN
                            break;
                        case 2: 
                            code  = this.STATUS.DOING
                            break;
                        case 3: 
                            code  = this.STATUS.SOON
                            break;
                        case 4: 
                            code  = this.STATUS.DONE
                            break;
                    }
                    this.noRecord = false
                    this.totalPage = -1
                    this.requestList(code, true)
                    this.startLoadmore()
                    this.resetLoadTip()
                },
                /**
                 * 发起加载下一个分页的请求
                 * @param  {Boolean} fromSelf 是否是自己发起的加载，而不是通过loadmore的事件发起的
                 * @return null
                 */
                loadNextPage: function(fromSelf,isNeedLoading){
                    if(this.totalPage >= this.page){
                        this.page++
                        this.requestList(this.curStatus)
                        this.loading = true
                    }
                    if(this.totalPage == -1){
                        this.page = 1
                        this.requestList(this.curStatus,true)
                    }
                }
            },
            methods:{
                requestError: function(data){
                    if(data){
                        data = typeof data == 'string' ? JSON.parse(data) : data
                    }
                    var self = this
                    new comps.ErrorPage.Default({
                        events: {
                            click: function(){
                                Docode.request(self.listChange,self.requestError, {
                                    'systemNo': Config.systemNo,
                                    'version': Config.version,
                                    'reqType': 'P1000000012',
                                    'curPage': String(self.page),
                                    'userNo': self.userInfo.profileId,
                                    'statusCode': self.curStatus,
                                })
                            }
                        }
                    }).$mount().$appendTo('body')

                },
                requestList: function(code, isNeedLoading){
                    //判断是否登录
                    Docode.request(this.listChange,this.requestError, {
                        'systemNo': Config.systemNo,
                        'version': Config.version,
                        'reqType': 'P1000000012',
                        'curPage': String(this.page),
                        'userNo': this.userInfo.profileId,
                        'statusCode': code,
                    })
                },
                listChange: function(data){
                    var result = data.encReqInfo
                    if(this.isSuccess === 'N'){
                        requestError();
                        return
                    }
                    if(result.statusCode == this.curStatus){
                        var loop = function(item){
                            this.list.push(item)
                        }.bind(this)
                        result.packageList.forEach(loop)
                        // this.$log('list')
                    }else{
                        this.curStatus = result.statusCode
                        this.$set('list',result.packageList)
                        this.letLoading()
                    }
                    this.$nextTick(function(){
                        this.totalPage = result.totalPage
                        if(result.totalPage <= this.page){
                            this.finishLoadmore()
                            this.letNomore()
                        }else{
                            var cb = function(){
                                this.check()
                            }.bind(this)
                            this.$nextTick(cb)
                        }
                    })
                    
                },
                setEndTime:function(val){
                    val = val || 0
                    return Number(val)*1000+this.startTime
                },
                letNomore: function(){
                    this.nomore = true
                    this.loading = false
                    if(this.list.length == 0){
                        this.noRecord = true
                        this.nomore = false
                    }
                },
                letLoading: function(){
                    this.nomore = false
                    this.loading = true
                },
                resetLoadTip: function(){
                    this.$set('list',[])
                    this.nomore = false
                    this.loading = false
                },
            },
        })
    )
</script>
<style lang='less'>
    @import '../../../../../b/components/src/core/less/var.less';
    @import '../../../../../b/components/src/core/less/utils.less';
    @import '../../less/var.less';
    .tab-nav-container {
        border-bottom: 1px solid @duobao-border;
    }
    .blocker {
        margin-bottom: .2rem;
    }
    .info{
        li{
            background: @white;
            margin-top: @font-sm;
            font-size: @font-nm-sm;
            .info-top{
                padding: @font-sm * 1.5;
                overflow: hidden;
                position:relative;
                .picture{
                    width: @font-sm * 5;
                    height: @font-sm * 5;
                    float: left;
                    margin-right: @font-sm;
                    border: 1px solid @duobao-border;
                }
                .content{
                    overflow: hidden;
                    color: @gray-light;
                    .produce{
                        font-size: @font-sm * 1.3;
                        line-height: @font-sm * 1.4;
                        color: @gray;
                    }
                    .participation{
                        margin-top: @font-btn/2;
                        a{
                            color: @font-act;
                            float: right;
                        }
                    }
                    .mywin{
                        color:@gray;
                        .number{
                            margin: @font-sm * 0.5 0;
                            span{
                                color:@duobao-red;
                            }
                        }
                        
                    }
                }

            }
            .info-bottom{
                margin-left: @font-sm * 1.5;
                color:@gray;
                border-top: 1px solid @duobao-border;
                overflow: hidden;
                min-height:@font-sm * 4.8;
                .people{
                    display: inline-block;
                    padding: (@font-sm * 1.1) 0 @font-sm 0;
                    color: @gray-light;
                    .progress{
                       
                    }
                    .left-num{
                        float: right;
                        span{
                            color: @duobao-red;
                        }
                    }
                }
                .countdown{
                    display:inline-block;
                    .time{
                        color: @duobao-red;
                        font-size: @font-sm * 2;
                        display: inline-block;
                        height:@font-sm * 4.8;
                        line-height:@font-sm * 4.8;
                    }
                }
                .win-info{
                    display: inline-block;
                    padding: @font-sm * 0.7 0;
                    p{
                        height: @font-sm * 1.7;
                        line-height: @font-sm * 1.7;
                        .luck-num{
                            color:@duobao-red;
                        }
                    }
                }
                .ui.btn {
                    margin: @font-sm (@font-sm * 1.5) 0 0;
                    float: right;
                    &.gray{
                        border-color: @duobao-border;
                    }
                    .buy{
                        /*width: @font-sm*8.5;
                        height: @font-nm*2;
                        line-height: @font-nm*2;
                        text-align: center;
                        display: inline-block;
                        border-radius: @font-sm/4;
                        float: right;
                        box-sizing: border-box;
                        color: @duobao-red;
                        border: 1px solid @duobao-red;
                        margin: @font-sm (@font-sm*1.5) 0 0;*/
                        border-color: @duobao-red;
                        color: @duobao-red;
                    }
                    .address{
                        /*width: @font-sm*8.5;
                        height: @font-nm*2;
                        line-height: @font-nm*2;
                        text-align: center;
                        display: inline-block;
                        border-radius: @font-sm/4;
                        float: right;
                        box-sizing: border-box;
                        border:1px solid @duobao-border;
                        color: @gray;
                        margin: @font-sm (@font-sm*1.5);*/
                        border-color: @gray;
                        color: @gray;
                    }
                }
               
                
                .pastdue{
                    color:@gray-light;
                    margin-top: @font-sm * 1.5;
                    float:left;
                    a{
                     color: @font-act;
                    }
                }
            }
        }
    }

    .record{
        text-align:center;
        .picture {
            height: @font-sm * 7;
            margin: (@font-sm * 7)  0 (@font-sm * 2);
            background:url("../../images/norecord.png") no-repeat center;
            background-size: @font-sm * 6.3;
        }
        
        .tips {
            margin-bottom: .6rem;
            p {
                font-size: @font-nm-sm;
                color: @gray-light;
                .set-line-height(1;@font-nm-sm * 2;);
            }            
        }
        .ui.btn {
            background-color: @duobao-red;
            width: 4.4rem;
        }
    }
    .nomore,
    .loading {
        color: @gray-light;
        font-size: @font-nm;
        .set-line-height(1;@font-nm * 3;);
    }
    .tab-nav-container {
        position: fixed;
        top: 0;
        z-index: @z-max - 100;
        padding: 0 .2rem;
        .tab-nav.scroller li{
            /*margin: 0 .2rem;
            &:first-child{
                margin-left: .4rem;
            }
            &:last-child{
                margin-right: .4rem;
            }*/
            padding: 0 .2rem!important;
        }

    }
    .blocker {
        width: 100%;
        height: .84rem;
    }
</style>