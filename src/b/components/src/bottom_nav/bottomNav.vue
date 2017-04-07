<template>
    <footer class="common_footer">
        <div class="user_bar">
            <div v-if="userName" class="left">
                <a @click="login">{{userName}}</a>
                <a @click="logout">退出</a>
            </div>
            <div v-else class="left">
                <a @click="login">登录</a>
                <a :href="registry">注册</a>
            </div>

            <div class="right">
                <a :href="feedBack">反馈</a>
                <a :href="more">更多</a>
            </div>
        </div>
        <div class="foot_msg">
            <ul class="msg_versions grid3">
                <li>
                    <a>
                        <div class="icon">
                            <img src="images/version_phone_2.png">
                            <em class="hint"></em>
                        </div>
                        <span class="name" style="color:#333;">触屏版</span>
                    </a>
                </li>
                <li class="active">
                    <a  id="appdownload">
                        <div class="icon">
                            <img src="images/version_app.png">
                            <em class="hint"><img src="images/new_gift.png"></em>
                        </div>
                        <span class="name">客户端</span>
                    </a>
                </li>
                <li>
                    <a :href="pcUrl">
                        <div class="icon">
                            <img src="images/version_pc.png">
                            <em class="hint"></em>
                        </div>
                        <span class="name">电脑版</span>
                    </a>
                </li>
            </ul>
            <div class="copyright">
            	
                <p>copyright ©  2000-2017 {{gomeName}}</p>
                <p>客服热线：4008-708-708</p>
            </div>
        </div>
    </footer>
</template>
<script>
export default (
    Vue.extend({
        data: function(){
            return {
                userName: '登录',
                gomeName: $g.env.gomeplus ? 'gomeplus.com' : 'gome.com.cn',
                pcUrl: $g.env.gomeplus ? '//www.gomeplus.com' : '//www.gome.com.cn/',
                feedBack: $g.env.gomeplus ? "//m.gomeplus.com/feed_back.html" : "//m.gome.com.cn/feed_back.html",
                more: $g.env.gomeplus ? "//m.gomeplus.com/more.html" : "//m.gome.com.cn/more.html",
                registry: $g.env.gomeplus ? "https://m.gomeplus.com/registered.html" : "https://m.gome.com.cn/registered.html",
            }
        },
        created: function(){
            
            $g.getUserInfo()
            .then(function(d){
                this.userName = d.userName
            }.bind(this))
            .catch(function(e){
                console.log(e.message)
            })
            
        },
        ready: function(){
            if(window.$){
                try{
                    $('#appdownload').appstart();
                }catch(e){

                }
            }
        },
        methods: {
            login: function(){
                $g.login()
            },
            logout: function(){
                $g.logout()
            }
        }
    })
)
</script>
<style lang='less'>
    @import "../core/less/var.less";
    @import "../core/less/layout.less";
    @import "../core/less/utils.less";
    @gray-border: #e6e6e6;
    .common_footer{
        background: #fff;
        .user_bar{
            padding: .3rem .26rem;
            border-bottom: .02rem solid #e6e6e6;
            overflow: hidden;
            .left{
                float: left;
                a:first-child{
                    border-right: .02rem solid #e6e6e6;
                }
            }
            .right{
                float: right;
            }
            a{
                display: inline-block;
                color: #197fe7;
                font-size: .24rem;
                padding: 0 .14rem;
                float: left;
            }
        }
        .foot_msg {
            width: 80%;
            margin: auto;
            text-align: center;
            .msg_versions {
                padding-top: .3rem;
                margin-bottom: .3rem;
                li {
                    .icon {
                        position: relative;
                        .hint{
                            position: absolute;
                            top: -0.1rem;
                            right: 0;
                            left: 42%;
                            color: #Fff;
                            font-size: .14rem;
                            border-radius: 0.12rem;
                            img{
                                height: .2rem;
                            }
                        }
                        img{
                            width: .64rem;
                            height: .64rem;
                            margin: auto;
                        }
                    }
                    .name {
                        display: block;
                        color: #999;
                        font-size: .24rem;
                        margin-top: .12rem;
                    }
                }
            }
            .copyright{
                padding-bottom: .3rem;
                p{
                    line-height: .36rem;
                    text-align: center;
                    font-size: .2rem;
                    color: #bfc2c5;
                }
            }
        }
    }

</style>
