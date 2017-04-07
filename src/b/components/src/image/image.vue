<template>
    <div class="img-container img-comp" >
        <img :src="defaultImg" v-lazyload="src" onerror="error"></img>
    </div>
</template>
<script>
    export default ({
        props: ['src','defaultSrc','errorSrc','default','size','bg'],
        data: function(){
            return {
                empty: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
                emptyW1H2: '',
                emptyW1H3: '',
                emptyW2H1: '',
                emptyW3H1: 'data:image/gif;base64,R0lGODlhAwABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5ODc5MkU1OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5ODc5MkU2OTNGRjExRTVBMEVCRkM1QUU0NjlGREE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk4NzkyRTM5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTk4NzkyRTQ5M0ZGMTFFNUEwRUJGQzVBRTQ2OUZEQTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAAwABAAACAoQLADs=',
            }
        },
        compiled: function(){
            if(this.bg == 'N'){
                this.$el.style.backgroundImage = '';
            }
        },
        methods: {
            getDefaultSrc: function(){
                if(this.defaultSrc)
                    return this.defaultSrc
                else{
                    var src;
                    switch(this.default){
                        case '1x1':
                            src = this.empty;
                            break;
                        case '1x2':
                            src = this.emptyW1H2;
                            break;
                        case '3x3':
                            src = this.emptyW1H3;
                            break;
                        case '2x1':
                            src = this.emptyW2H1;
                            break;
                        case '3x1':
                            src = this.emptyW3H1;
                            break;
                        default:
                            src = this.empty;
                            break;
                    }
                    return src
                }
            }
        },
        computed: {
            defaultImg: function(){
                return this.getDefaultSrc();
            },
            error: function(){
                return "javascript:this.src='" + (this.errorSrc || this.getDefaultSrc()) + "';"
            }
        }
    })
</script>
<style lang='less'>
    .img-container.img-comp {
        background-image: url('../core/images/default_bg.png');
        background-repeat: no-repeat;
        -webkit-background-size: 80%;
        background-size: 80%;
        background-position: center;
    }
</style>