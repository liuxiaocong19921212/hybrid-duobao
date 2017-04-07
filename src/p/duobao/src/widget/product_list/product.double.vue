//product.double.vue
<template>
	<!-- <tab-nav :list="data.statusList"></tab-nav> -->
    <div class="product-container" v-if="data">
        <div class="menu-box">
            <div class="blocker"></div>
            <div class="tab-menu-box">
                <ul class="tab-menu">
                    <menu-item v-ref:menuItem :data="item" :idx="$index" v-for="item in data.statusList"></menu-item>
                    <li id="showTypeMenu" @click="showTypeList"><span><em>全部商品</em><i class="icon"></i></span></li>
                </ul>
                <div class="type typeDropList" v-show="isShowDrop" v-el:droplist @click="hideDropList($event)">
                    <div class="type-list grid4">
                        <a href="javascript:;" v-for="item in data.commodityCategoryList" @click="choseType($event)">
                           <span :data-no="item.attrNo">{{item.title}}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <ul class="product_list">       
            <pd-item :list="item" v-for="item in list"></pd-item>       
        </ul>    
        <div v-show="nomore" class="loading box center">
            没有更多了
        </div>
        <div v-show="loading" class="loading box center">
            <!-- 加载中... -->
        </div>
        <div v-show="noRecord == true" class="norecord box center">
            暂无夺宝数据
        </div>
    </div>
</template>
<script>
	import Docode from 'docode'
	import Config from 'config'
	import QueryParser from 'queryparser'
	import comps from 'components' 
	import pdItem from './product.db.vue'
	import menuItem from './menu.item.vue'
	import Loadmore from '../../utils/loadmore.vue'
    export default (
        Vue.extend({
        	components:{
        		'button': comps.Button,
        		'tab-nav': comps.TabNav,
        		'timer': comps.Timer.Default,
        		'pd-item': pdItem,
        		'menu-item':menuItem
        	},
            mixins: [Loadmore],
        	data:function(){
        		return{
        			tabs:{
        				'border-bottom':'1px solid #f0f'
        			},
                    isShowDrop: false,
                    list:[],
                    code:'030',
                    attrNo:'all',
                    noRecord: false,
                    nomore:false,
                    loading:false,
                    totalPage:-1,
                    curState:''//"最热"
        		}
        	},
        	created:function(){
        		//添加 ‘全部商品’ 类目
        		// var allPdType = {'statusCode':'','statusNa':'全部商品'}
       			// this.data.statusList.push(allPdType);

       			// 默认状态“最热”
                var self = this;   
       			if(this.data.statusList.length>1){
		            this.data.statusList.forEach(function(item,idx){
		                if(idx == 0){
		                    item.isCur = true;
                            self.curState = item.statusCode;
		                }else{
		                    item.isCur = false;
                        }
                    })    
		        }
        	},
            ready:function(){
                var _scope = this;
                window.addEventListener('scroll', function(){
                    var $body = _scope.$el.parentElement;
                    var $blocker = $body.querySelector('.blocker');
                    var rect = $blocker.getBoundingClientRect();

                    var menuItem = _scope.$refs.menuItem;
                    var $menuList = $body.querySelector('.tab-menu-box');
                    if(rect.top < 0){
                        $menuList.style.position = 'fixed'
                        $menuList.style.zIndex = '1001'
                        $menuList.style.width = '100%'
                        $menuList.style.top = '0'
                        $blocker.style.height = $menuList.offsetHeight + 'px'
                    }else{
                        $menuList.style.position = 'inherit'
                        $menuList.style.zIndex = '1000'
                        $blocker.style.height = 0 + 'px' 
                    }
                })               
            },
        	events:{
        		clickRespond:function(idx,event){
                    var el = event.currentTarget;
                    this.page = 1
                    window.noMove = function(e){
                        e.preventDefault();
                    }
                    var code = this.code
                    code = el.childNodes[1].getAttribute('data-code')
                    this.isShowDrop = false
                    this.noRecord = false
                    this.totalPage = -1
                    this.requestList(code,this.attrNo, true)
                    this.startLoadmore()
                    this.forbidMove(this.isShowDrop);
        			this.$broadcast('reset')
                    this.rotated(false);
                    // window.noMove = function(e){
                    //     e.preventDefault();
                    // }
                    // document.removeEventListener('touchmove',noMove)  
            		// return true
        		},
        		 /**
                 * 发起加载下一个分页的请求
                 * @param  {Boolean} fromSelf 是否是自己发起的加载，而不是通过loadmore的事件发起的
                 * @return null
                 */
        		loadNextPage:function(fromSelf, isNeedLoading){
                    if(this.totalPage >= this.page){
            			this.page++
                        this.requestList(this.curState,this.attrNo);
                        this.loading = true
                    }
                    if(this.totalPage == -1){
                        this.page = 1
                        this.requestList(this.curState,this.attrNo,true)
                    }
        		}
        	},
        	methods:{
                rotated:function(flag){
                    var $dropicon = document.getElementById('showTypeMenu').querySelector('.icon');
                    if(flag){
                        $dropicon.style.transform = 'rotate(180deg)'
                    }else{
                        $dropicon.style.transform = 'rotate(0deg)'
                     }
                    
                },
                hideDropList:function(){
                    if(this.isShowDrop){
                        this.rotated(false);
                        this.isShowDrop = false
                    }
                    this.forbidMove(this.isShowDrop);
                },
                noMove:function(event){
                    event.preventDefault();
                },
                forbidMove:function(isMove){
                    if( isMove == true){
                        document.addEventListener('touchmove',this.noMove,false)   
                    }else{
                        document.removeEventListener('touchmove',this.noMove,false) 
                    }
                },
                showTypeList:function(){
                    var $body = this.$el.parentElement;
                    var $typeBox = $body.querySelector('.typeDropList');
                    
                    var windowHeight = window.screen.height,
                        menuHeight = $body.querySelector('.menu-box').offsetHeight,
                        menuTop = $body.querySelector('.menu-box').scrollTop;
                    $typeBox.style.height = (windowHeight - menuHeight - menuTop) + 'px';
                    if(this.isShowDrop){
                        this.rotated(false);
                        this.isShowDrop = false
                    }else{
                        this.rotated(true);
                        this.isShowDrop = true
                    }
                    this.forbidMove(this.isShowDrop);
                },
                choseType:function(event){
                    var showTypeMenu = document.getElementById('showTypeMenu'),
                        $em = showTypeMenu.getElementsByTagName('em')[0],
                        $item = event.currentTarget,
                        $span = $item.getElementsByTagName('span')[0];
                    $em.innerHTML = $span.innerHTML;
                    var attrNo = $span.getAttribute('data-no')
                    this.rotated(false);
                    this.noRecord = false
                    this.isShowDrop = false
                    this.forbidMove(this.isShowDrop);
                    if(this.attrNo != attrNo){
                        this.totalPage = -1
                        this.page = 1;
                        this.startLoadmore();
                        this.requestList(this.curState,attrNo,true)
                    }
                },
                requestList:function(code,attrNo,isNeedLoading){
                    Docode.request(this.listChange, new Function, {
                        'systemNo': Config.systemNo,
                        'version': Config.version,
                        'reqType': 'P1000000001',
                        'curPage': String(this.page),
                        'orderType': code,
                        'raiseAttrs': attrNo
                    })
                },
                listChange:function(data){
                    data = typeof data === 'string' ? JSON.parse(data) : data
                    var result = data.encReqInfo
                    if(this.isSuccess === 'N')return
                    if(result.orderType == this.curState && result.raiseAttrs == this.attrNo){
                        var loop = function(item){
                            this.list.push(item)
                        }.bind(this)
                        result.packageList.forEach(loop)
                    }else{
                        this.curState = result.orderType
                        this.attrNo = result.raiseAttrs
                        this.$set('list',result.packageList)
                        this.letLoading()
                    }
                    this.totalPage = result.totalPage
                    if(result.totalPage <= this.page){
                        this.finishLoadmore()
                        this.letNomore()
                    }
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
        	}
        })
    );
</script>
<style lang='less'>
	@import '../../../../../b/components/src/core/less/var.less';
	@import '../../../../../b/components/src/core/less/layout.less';
	@import '../../../../../b/components/src/core/less/utils.less';
	@import '../../less/duobao.less';
	@theme_db: #ff5a5a;
	.product_list{
		.module();
		.grid(2);
		background: @white;	
        >*{
            overflow: hidden;
        }
	}
	.tab-menu{
		.flexbox();
		background: @white;
		border-bottom:1px solid #e6e6e6;
	}	
	.loading {
        color: @gray;
        font-size: @font-nm-sm;
        .set-line-height(1;@font-nm-sm * 2);
    }
    #gotop{
        bottom: .54rem;
    }
    .menu-box{
        z-index: @z-min+2;
        position: relative;
        .type{
            position: absolute;
            top: (@font-sm * 4 + 0.01rem);
            background: rgba(0,0,0,.5);
            height: 100%;
            .type-list{
                .grid(4);
                background: rgba(255,255,255,.95);
                padding: .15rem 0;
                border-bottom: 1px solid #e6e6e6;
                a{
                    text-align: center;
                    line-height: .44rem;
                    font-size: @font-nm-sm;
                    color: @gray-dark;
                    padding: .12rem 0;
                }
                a:active{
                    color: @gray-dark;
                }
            }
        }        
    }
    .norecord{
        font-size: @font-nm-sm;
        color: @gray-light;
        .set-line-height(1;@font-nm-sm*2);        
        text-align: center;
        min-height: 3rem;
    }
</style>