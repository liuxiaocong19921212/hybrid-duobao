//focusPhoto.default.vue
<template>
    <swiper v-bind:options="options" v-bind:list="data">
        <slider v-for="item in data" track-by="$index" v-bind:options="options" slot="slider">
            <a :href="item.href">
                <img v-lazyload:nohori="item.imgPath" src="../../images/lazy_banner.png" onerror="javascript:this.src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='">
            </a>
        </slider>
        <pagination :class="pageType"></pagination>
        <div v-if="!options.pagination" :class="custom">
            <span>{{idx}}</span>/{{length}}
        </div>
    </swiper>
</template>
<script>
    import comps from 'components'
    export default (
    Vue.extend({
        components: {
            'swiper': comps.Swiper,
            'slider': comps.Slider,
            'pagination': comps.Pagination
        },
        data: function(){
            return {
                idx: 1,
                length: undefined,
            }
        },
        created: function(){
            this.length = this.data.length
            var head = this.data[0]
            var tail = this.data[this.data.length-1]
            this.data.push(head)
            this.data.unshift(tail)
        },
        events: {
            scrollTo: function(idx){
                this.idx = idx + 1 
                if(idx <= 0)
                    this.idx = 1
                if(idx >= this.length)
                    this.idx = this.length
            }
        }
    })
)
</script>
