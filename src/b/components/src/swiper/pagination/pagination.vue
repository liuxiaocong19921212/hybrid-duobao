//pagenation.vue
<template>
    <ul class='pagination'>
        <page
        v-for='item in pageCount'
        track-by="$index"
        v-bind:index='$index'
        v-bind:style='[circle]'></page>
    </ul>
</template>
<script>
    import Page from './page.vue'
    module.exports = {
        props:[],
        data: function(){
            return {
                pageCount: 0,
                rem: 0
            }
        },
        components: {
            page: Page
        },
        computed: {
            circle: function(){
                if(this.$el.className.match(/cubic/)){
                    return {}
                }
                return {
                    'width': parseInt(.11*this.rem)+'px',
                    'height': parseInt(.11*this.rem)+'px'
                }
            }
        },
        created: function(){
            this.rem = parseInt(document.querySelector('html').style.fontSize);
            if(this.index == 0){
                this.isActive = true;
            }
        },
        events: {
            resize: function(width,pageCount){
                this.rem = parseInt(document.querySelector('html').style.fontSize);
                this.pageCount = pageCount;
            },
            idxChange: function(idx){
                var _idx = idx
                if(idx == this.pageCount)
                    _idx = 0
                else if(idx == -1)
                    _idx = this.pageCount-1
                this.$broadcast('idxChange', _idx)
            }
        }
    }
</script>
<style lang='less'>
    @import '../../core/less/var.less';
    @import '../../core/less/layout.less';
    .test {
        .flexbox();
        .test {
            .flexitem(12);
        }
    }
    .swiper-container {
        .pagination {
            display: block;
            width: 100%;
            position: absolute;
            z-index: 11;
            bottom: 0;
            height: .25rem;
            font-size: 0;
            text-align: center;
            /*&.default {*/
                li {
                    font-size: .12rem;
                    line-height: .3rem;
                    display: inline-block;
                    margin: 0 .06rem;
                    width: .11rem;
                    height: .11rem;
                    border-radius: 50%;
                    background-color: rgba(255,255,255,.6);
                    &.active {
                        background-color: #fff;
                    }
                }
            /*}*/
            &.cubic {
                li {
                    font-size: .12rem;
                    line-height: .3rem;
                    display: inline-block;
                    margin: 0 .05rem;
                    border-radius: 0;
                    height: .06rem;
                    width: .3rem;
                    background-color: @gray;
                    opacity: .8;
                    &.active {
                        background-color: @red;
                    }
                }
                &.white {
                    li{
                        background-color: @white;
                        opacity: .3;
                        &.active {
                            opacity: 1;
                        }
                    }
                }
            }
            &.red {
                li {
                    background-color: @gray-lighter;
                    &.active {
                        background-color: @red;
                    }
                }
            }
            &.block {
                position: relative;
                padding-top: .1rem;
                box-sizing: content-box;
                background-color: transparent;
                li {
                    background-color: @gray-lighter;
                    &.active {
                        background-color: @red;
                    }
                }
            }
        }
    }

</style>
