<template>
    <li v-show="isShow">
        <a :href="data.url">
            <div class="item">
                <span class="title">{{data.desc}}</span>
                <span class="right" v-if="data.joinTimes">已参与<em>{{data.joinTimes}}</em>次</span>
            </div>
        </a>
    </li>
</template>
<script>
    export default ({
        props: ['data'],
        data: function(){
            return {
                isShow: false
            }
        },
        created: function(){
            if(typeof this.data.joinTimes == 'undefined'){
                this.isShow = true
            }else{
                var self = this
                navigator.gome.util.nativeUtils.isLogin(function(data){
                    data = typeof data == 'string' ? JSON.parse(data) : data
                    if(data.isLogin == 'Y'  && self.data.joinTimes > 0){
                        self.isShow = true
                    }
                })
            }
        }
    })
</script>