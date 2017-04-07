<template>
    <span class="timer"><span v-show="this.day>=1"><span class="time day">{{day}}</span><span class="day-tip">天<span v-show="this.day==3">以上</span></span></span><em v-show="this.day<1"><span class="time">{{hour}}</span><i>:</i><span class="time">{{minitue}}</span><i>:</i><span class="time">{{second}}</span></span></em>
</template>
<script>
import base from './timer.mixin.vue'
export default ({
    mixins: [base]
})
/*function GetRTime(){
       var EndTime= new Date('2013/05/1 10:00:00'); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
       var NowTime = new Date();
       var t =EndTime.getTime() - NowTime.getTime();
       /*var d=Math.floor(t/1000/60/60/24);
       t-=d*(1000*60*60*24);
       var h=Math.floor(t/1000/60/60);
       t-=h*60*60*1000;
       var m=Math.floor(t/1000/60);
       t-=m*60*1000;
       var s=Math.floor(t/1000);*/

      /* var d=Math.floor(t/1000/60/60/24);
       var h=Math.floor(t/1000/60/60%24);
       var m=Math.floor(t/1000/60%60);
       var s=Math.floor(t/1000%60);

       document.getElementById("t_d").innerHTML = d + "天";
       document.getElementById("t_h").innerHTML = h + "时";
       document.getElementById("t_m").innerHTML = m + "分";
       document.getElementById("t_s").innerHTML = s + "秒";
   }
   setInterval(GetRTime,1000);*/
</script>
<style lang='less'>

</style>
