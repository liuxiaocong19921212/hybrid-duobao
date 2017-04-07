<template>
    <div class="error-page" :style="isFixed">
        <div class="img-container">
            <img :src="imageUrl">
        </div>
        <p>{{content}}</p>
        <btn v-if="btnContent" @click="onClick" class="default reverse gray">{{btnContent}}</btn>
    </div>
</template>
<script>
    import btn from '../button/btn.vue'
    export default (
        Vue.extend({
            components: {
                'btn': btn
            },
            created: function(){
                if(!window.location.href.match(/^file/)){
                    this.isFixed = {
                        position: 'initial'
                    };
                }
            },
            methods: {
                onClick: function(){
                    this.$emit('click')
                    this.$remove()
                }
            }
        })
    )
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    @import '../core/less/utils.less';
    .error-page {
        .flexbox();
        .flexbox.vertical();
        .flexbox.center();
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: @gray-bg;
        z-index: @z-max * 2;
        .img-container {
            width: 50%;
            max-width: 320px;
        }
        .btn {
            margin-top: .2rem;
        }
    }
</style>