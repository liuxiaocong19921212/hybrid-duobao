<script>
    /**
     * 加载更多的base
     */
    import Docode from 'docode'
    import comps from 'components'
    export default ({
        mixins: [comps.Loadmore],
        created: function(){
            this.check()
        },
        data: function(){
            return {
                /**
                 * 列表数组
                 * @type {Array}
                 */
                list: [],
                /**
                 * 加载更多的预测高度
                 * @type {Number}
                 */
                loadmoreHeight: 0,
                /**
                 * 初始加载的分页
                 * @type {Number}
                 */
                page: 1,
                /**
                 * 是否显示加载中
                 * @type {Boolean}
                 */
                loading: false,
                /**
                 * 是否没有更多了
                 * @type {Boolean}
                 */
                nomore: false,
            }
        },
        events: {
            /**
             * loadmore的到达底部的会调
             * @return null
             */
            onPageEnd: function(){
                this.loadNextPage(true)
            }
        },
        methods: {
            check: function(){
                if(this.checkOverViewport()){
                    this.loadNextPage();
                }
            },
            /**
             * 不加载更多了
             * @return null
             */
            done: function(){
                this.nomore = true
                this.loading = false
            },
            /**
             * 加载更多
             * @param  {[type]} data [description]
             * @return {[type]}      [description]
             */
            loadMore: function(data){
                data = typeof data === 'string' ? data : JSON.stringify(data)
                var result = JSON.parse(data).encReqInfo
                if(result.isSuccess === 'N'){
                    this.$emit('loadMoreFailed',result)
                    this.loading = false
                    return
                }
                this.$emit('loadMoreOk',result)
                var resultList = this.getResultList(result)
                if(resultList)
                    resultList.forEach(this.loop)
                if(result.totalPage <= this.page){
                    this.done()
                    this.finishLoadmore()
                    return
                }
                this.page++
                this.$nextTick(function(){
                    if(!this.checkOverViewport()){
                        this.loading = true
                    }
                    if(this.checkOverViewport()){
                        this.loadNextPage();
                    }
                })
            },
            loadMoreFailed: function(){
                navigator.gome.util.nativeUtils.showToast(data.failReason || '加载失败')
                this.finishLoadmore()
            },
            /**
             * 发起加载下一个分页的请求
             * @param  {Boolean} fromSelf 是否是自己发起的加载，而不是通过loadmore的事件发起的
             * @return null
             */
            loadNextPage: function(fromSelf){
                var isNeedLoading = 'Y'
                if(fromSelf){
                    isNeedLoading = 'N'
                }
                this.$emit('loadNextPage',fromSelf,isNeedLoading)
            },
            /**
             * 像参与列表中添加一个记录
             * @param  {obj} item 一个参与记录
             * @return {[tynull
             */
            loop: function(item){
                this.list.push(item)
            },
            /**
             * @override
             * 需要被继承
             
             */
            getResultList: new Function,
            finishLoadmore: function(){
                this.stopLoadmore()
                this.loading = false
            },
            resetLoadmore: function(){
                this.startLoadmore()
                this.loading = true
            }
        }
        
    })
</script>