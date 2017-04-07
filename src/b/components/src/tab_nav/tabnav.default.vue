<template>
    <ul class='tab-nav default tab-nav-container'>
        <item v-for = 'item in list' :idx="$index" :content='item'>
            {{item.tagName}}
            <span v-if='item.number'>({{item.number}})</span>
        </item>
    </ul>
</template>
<script>
import Item from './item.vue';
export default ({
    props: ['list'],
    data: function(){
        return {

        }
    },
    components: {
        'item': Item
    },
    events: {
        clickOne: function(idx){
            this.$broadcast('reset')
            return true
        }
    },
    created: function(){
        if(this.list.length>1){
            this.list.forEach(function(item,idx){
                if(idx == 0)
                    item.isActive = true;
                else
                    item.isActive = false;
            })    
        }
    },
})
</script>
<style lang='less'>
    @import '../core/less/var.less';
    @import '../core/less/layout.less';
    .tab-nav.default {
        .flexbox();
        width: 100%;
        height: .84rem;
        padding:0 .2rem;
        color: @gray-dark;
        border-bottom: @border-nm;
        background-color: @white;
        li {
            .flexitem(1);
            padding: 0 .1rem;
            overflow: hidden;
            text-overflow:ellipsis;
            overflow: hidden;
            white-space:nowrap;
            text-align: center;
            line-height: .84rem;
            height: 100%;
            font-size: .28rem;
        }
    }
</style>