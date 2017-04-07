//alert.vue
<template>
    <div class="alert">
        <div class="window">
            <h4 v-if="title" class="title">
                <span class="text">{{title}}</span>
                <button v-if="hasClose" class='close' @click="$destroy(true)">
                    <div class='blocker'></div>
                    <i>&#x0042</i>
                </button>
            </h4>
            <p v-if="content" class="content">{{content}}</p>
            <div class="btn-container">
                <btn @click="onClick('cancel',$event)" v-if='cancel' class='reverse gray'>{{cancel}}</btn>
                <btn @click="onClick('ok',$event)" v-if='ok' class='reverse gray'>{{ok}}</btn>
            </div>
        </div>
    </div>
</template>
<script>
    import Button from '../button/btn.vue'
    export default Vue.extend({
        components: {
            'btn': Button
        },
        data: function(){
            return {
                'title': '',
                'content': '',
                'cancel': '',
                'ok': '',
                hasClose: false
            }
        },
        methods: {
            onClick: function(msg,e){
                this.$emit(msg,e)
                this.$destroy(true);
            }
        },
        created: function(){
            this.$mount()
        },
        compiled: function(){
            this.$appendTo('body')
        }
    })
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .alert {
        position: fixed;
        top: 0;
        left: 0;
        z-index: @z-max+100;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.6);
        .flexbox();
        .flexbox.center();
        .window {
            width: 80%;
            max-width: 520px;
            background-color: @white;
            .title {
                font-size: .32rem;
                text-align: center;
                line-height: 1.22rem;
                color: @gray-dark;
                .flexbox();
                .text {
                    .flexitem(1);
            }
            }
            .close {
                color: @gray-dark;
                position: absolute;
                -webkit-transform: translateX(-100%);
                transform: translateX(-100%);
                .blocker {
                    .flexitem(1);
                    display: block;
                    content: ' ';
                    height: 100%;
                    width: 100%;
                    -webkit-box-flex: 1;
                }
                i {
                    .font-icon();
                    display: block;
                    width: .7rem;
                    height: 100%;
                    line-height: .88rem;
                }
            }
            .content {
                text-align: center;
                font-size: .32rem;
                padding: .4rem;
                color: @gray-dark;
            }
            .btn-container {
                .flexbox();
                .ui.btn {
                    .flexitem(1);
                    height: .88rem;
                    font-size: .32rem;
                    background-color: @white;
                    color: @gray-dark;
                    line-height: .88rem;
                    text-align:center;
                    border: none;
                    border-radius: 0;
                    border-top: @border-nm;
                    &:first-child:not(:only-child) {
                        border-right: @border-nm;
                    }
                }
            }
        }

    }
</style>
