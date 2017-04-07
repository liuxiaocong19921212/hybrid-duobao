//comps
var AlertDefault = require('./alert/alert.default.vue')
var BigSmall = require('./big_small/big_small.vue')
var Button = require('./button/btn.vue')
var BottomNav = require('./bottom_nav/bottomNav.vue')
var Coupon = require('./coupon/coupon.vue')
var Flexgrid = require('./flexgrid/flexgrid.vue')
var FloorPhoto = require('./floor_photo/floor_photo.vue')
var GotopDefault = require('./gotop/gotop.default.vue')
var GotopSolid = require('./gotop/gotop.solid.vue')
var ListCol1 = require('./list/listCol1.vue')
var ListCol2 = require('./list/listCol2.vue')
var ListCol3 = require('./list/listCol3.vue')
var Product = require('./product/product.vue')
var ProductMask = require('./product/product.mask.vue')
//var ProductListCol1 = require('./product/product.list.col1.vue')
//var ProductListCol2 = require('./product/product.list.col2.vue')
var ProductTag = require('./product/productTag.vue')
var ProductTagGradient = require('./product/productTagGradient.vue')
var ProductContent = require('./product/content/productContent.vue')
var Timer = require('./timer/timer.vue')
var TimerHMS = require('./timer/timer.hms.vue')
var TimerUnder3 = require('./timer/timer.under3.vue')
var Swiper = require('./swiper/swiper/swiper.vue')
var Slider = require('./swiper/swiper/slider.vue')
var Pagination = require('./swiper/pagination/pagination.vue')
var TabNav = require('./tab_nav/tabnav.default.vue')
var TabNavScroll = require('./tab_nav/tabnav.scroll.vue')
var TabNavImg = require('./tab_nav/tabnav.img.vue')
var TagDefault = require('./tag/tag.vue')
var TagIcon = require('./tag/tagIcon.vue')
var TagSolid = require('./tag/tagSolid.vue')
var TipNoMore = require('./tipNoMore/tipNoMore.vue')
var Scroller = require('./scroller/scroller.vue')
var ScrollerMore = require('./scroller/scroller.more.vue')
var Loadmore = require('./utils/loadmore.vue')
var Loading = require('./loading/loading.vue')
var Toast = require('./toast/toast.vue')
var ErrorPage = require('./error_page/error.vue')
var ErrorPageCustom = require('./error_page/error.custom.vue')
var Image = require('./image/image.vue')
var Config = require('./utils/config.js')
//utils
require('./utils/vue.lazyload.js')
Vue.use(Vue.lazyload,Vue.lazyload.opt)
/*Vue.component('big-small',BigSmall);
Vue.component('coupon',Coupon);
Vue.component('flexgrid',Flexgrid);
Vue.component('floor-photo',FloorPhoto);
Vue.component('list-col1',ListCol1);
Vue.component('list-col2',ListCol2);
Vue.component('product',Product);
Vue.component('product-tag',ProductTag);
Vue.component('product-tag-price',ProductTagPrice);
Vue.component('swiper',Swiper);
Vue.component('slider',Slider);
Vue.component('pagination',Pagination);
Vue.component('tab-nav',TabNav);
Vue.component('tab-nav-scroll',TabNavScroll);*/

var bridge = require('./utils/bridge.js')
module.exports = {
    'Alert': {
        'Default': AlertDefault
    },
    'Gotop': {
        'Default': GotopDefault,
        'Solid': GotopSolid,
    },
    'List': {
        'Col1': ListCol1,
        'Col2': ListCol2,
        'Col3': ListCol3
    },
    'Button': Button,
    'BigSmall': BigSmall,
    'BottomNav': BottomNav,
    'Flexgrid': Flexgrid,
    'FloorPhoto': FloorPhoto,
    'ListCol1': ListCol1,
    'ListCol2': ListCol2,
    'ListCol3': ListCol3,
    'Product': {
        'Default' : Product,
        'Mask': ProductMask
        //'ListCol1' : ProductListCol1,
        //'ListCol2' : ProductListCol2,
    },
    'ProductTag': ProductTag,
    'ProductTagGradient':ProductTagGradient,
    'Swiper': Swiper,
    'Slider': Slider,
    'Pagination': Pagination,
    'TabNav': TabNav,
    'TabNavScroll': TabNavScroll,
    'TabNavImg':TabNavImg,
    'Timer': {
        "Default": Timer,
        'HMS': TimerHMS,
        'Under3': TimerUnder3
    },
    'Tag': {
        'Default': TagDefault,
        'Icon': TagIcon,
        'Solid': TagSolid,
    },
    'TipNoMore': TipNoMore,
    'Scroller': Scroller,
    'ScrollerMore': ScrollerMore,
    'Loadmore': Loadmore,
    'Toast': Toast,
    'ErrorPage': {
        'Default': ErrorPage,
        'Custom': ErrorPageCustom
    },
    'Image': Image,
    "bridge": bridge(),
    'Config': Config
}

/**
 * toast polyfill for wap
 */
window.addEventListener('toast',function(e){
    var data = e.data
    if(!document.querySelector('#toast')){
        var toast = document.createElement('div')
            toast.id = 'toast'
            document.body.appendChild(toast)
    } 
    new Toast({
        el: '#toast',
        data: {
            text: data
        }
    })
})

/**
 * loading polyfill for wap
 */
var loadingBar
window.addEventListener('loading',function(e){
    if(!document.querySelector('#loading')){
        var loading = document.createElement('div')
            loading.id = 'loading'
            document.body.appendChild(loading)
    } 
    loadingBar = new Loading({
        el: '#loading',
    })
})
window.addEventListener('loaded',function(e){
    if(loadingBar)
        loadingBar.$remove()
    loadingBar = null
})