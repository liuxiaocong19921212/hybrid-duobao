<script>
export default ({
    data: function(){
        return {
            loadmoreHeight: 0,
            shouldEmit: true,
            stop: false
        }
    },
    created: function(){
        this.startLoadmore()
    },
    methods: {
        onLoadmoreScroll: function(initok){
            var delta = (document.documentElement.clientHeight + document.body.scrollTop) - (document.body.scrollHeight - this.loadmoreHeight)
            if (this.shouldEmit && delta >= 0){
                this.shouldEmit = false
                this.$emit('onPageEnd',initok)
            }else if(delta <= 0){
                this.shouldEmit = true
            }
        },
        checkOverViewport: function(){
            var delta = (document.documentElement.clientHeight + document.body.scrollTop) - (document.body.scrollHeight - this.loadmoreHeight)
            if(delta >= 0){
                return true
            }else{
                return false
            }
        },
        stopLoadmore: function(){
            window.removeEventListener('scroll',this.onLoadmoreScroll)
        },
        startLoadmore: function(){
            window.addEventListener('scroll',this.onLoadmoreScroll)
        }
    }
})

</script>