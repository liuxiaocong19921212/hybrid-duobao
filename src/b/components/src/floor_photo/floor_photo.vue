//floor_photo.vue
<template>
    <div class='floorphoto'>
        <div class="rows" v-for='item in list' @click='onClick($index)'>
                <a :href="item.href">
                    <!--<img :src="item.imageUrl">-->
                    <img src='data:image/gif;base64,R0lGODlhAwABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5ODc5MkU1OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5ODc5MkU2OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk4NzkyRTM5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTk4NzkyRTQ5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAAwABAAACAoQLADs=' v-lazyload="item.imageUrl">
            </a>
        </div>
    </div>
</template>
<script>
export default ({
    props: ['list'],
    methods: {
        onClick: function(idx) {
            this.$dispatch('clickOne',idx);
        }
    }
})
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .floorphoto {
        .rows {
            background-image: url(../core/images/default_bg.png);
            background-size: contain;
            background-color: @white;
            background-repeat: no-repeat;
            background-position: center;
            img {
                opacity: 0;
            }
        }
        &.col1 {
            .grid(1);
        }
        &.col2 {
            .grid(2);
        }
        &.col3 {
            .grid(3);
        }
        &.col4 {
            .grid(4);
        }
        &.col5{
            .grid(5);
        }
        &.col6 {
            .grid(3);
        }
        &.col8 {
            .grid(4);
        }
        &.col {
            .flexbox();
            .rows {
                /*box-sizing: content-box;*/
                .flexitem(1);
            }
            /*&:first-child {
                &:not(:only-child) {
                    a:not(last-child) {
                        border-bottom: @border-nm;
                    }
                }
            }*/
            &:not(:last-child) {
                border-bottom: @border-nm;
            }
            .rows:not(:last-child) {
                border-right: @border-nm;
            }
            .rows:last-child:not(:only-child){
                position: relative;
                a{
                    position: absolute;
                    top:0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    img{
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

    }

</style>
