<template>
    <div  class="tip-slide-more">
        <div class='offset-wrapper'>
            <i :class="jumpMore.arrowDirection">></i>
            <p class="tip-content">{{jumpMore.slideTip}}</p>
        </div>
    </div>
</template>
<script>
    export default ({
        data: function(){
            return {
                jumpMore: {
                    canSlide: true,
                    canJump: false,
                    transLimit: 0,
                    slideTip: "左滑更多",
                    arrowDirection: 'left',
                    now: window.serverCurTime,
                }
            }
        },
        events: {
            scrollerTransLimit: function(transLimit){
                if(!transLimit)
                    this.jumpMore.canSlide = false
                else
                    this.jumpMore.transLimit = transLimit
            },
            scrollerBounceToEnd: function(){
                if(this.jumpMore.canJump){
                    this.slideTip = '左滑更多'
                    this.arrowDirection = 'left'
                    this.$dispatch('jump');
                }
            },
            scrollerCurPos: function(curPos){
                var offset = Math.abs(this.jumpMore.transLimit) - Math.abs(curPos)
                this.offset = offset
                if(Math.abs(offset) >= document.body.offsetWidth * 0.2 && offset < 0){
                    this.jumpMore.slideTip = '松开查看更多'
                    this.jumpMore.arrowDirection = 'right'
                    this.jumpMore.canJump = true
                }else{
                    this.jumpMore.slideTip = '左滑更多'
                    this.jumpMore.arrowDirection = 'left'
                    this.jumpMore.canJump = false
                }
            }
        }

    })
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/utils.less';
    @import '../core/less/icon.less';
    @import '../core/less/layout.less';
    .tip-slide-more {
        @font-size: @font-nm + 0.02rem;
        width: @font-size;
        position: relative;
        font-size: @font-size;
        color: @gray-light;
        .offset-wrapper {
            position: absolute;
            height: 100%;
            .flexbox();
            .flexbox.center();
            width: @font-size * 2;
            i {
                margin-right: @font-size / 2;
                transition: .3s all;
                &.left {
                    -webkit-transform: rotate(-90deg);
                }
                &.right {
                    -webkit-transform: rotate(-90deg) scaleY(-1);
                }
                .icon-font();
                font-size: @font-size;
            }
            .tip-content {
                width: @font-size;
                line-height: 1.2;
            }
        }
        
    }
</style>