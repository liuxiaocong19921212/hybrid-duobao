//webpack.config.js
var webpack = require("webpack")
var args = require('../lib/argParser.js')
var outputPath = 'tmp/p'
module.exports = {
    entry: {
        'js/utils/config': './src/p/duobao/src/utils/config.js',
        'widgets/widgets.shortcut': './src/p/duobao/src/widget/shortcut/shortcut.vue',
        'widgets/widgets.carousel': './src/p/duobao/src/widget/carousel/carousel.vue',
        'widgets/widgets.pdlist.double': './src/p/duobao/src/widget/product_list/product.double.vue',
        'widgets/widgets.pdlist.luck': './src/p/duobao/src/widget/product_list/product.luck.vue',
        'widgets/widgets.pdlist.result': './src/p/duobao/src/widget/product_list/product.result.vue',
        'widgets/widgets.pdlist.my': './src/p/duobao/src/widget/product_list/product.my.vue',
        'widgets/widgets.pd.order': './src/p/duobao/src/widget/product_list/product.order.vue',
        'widgets/widgets.detail.info': './src/p/duobao/src/widget/detail/detail.info.vue',
        'widgets/widgets.detail.nav': './src/p/duobao/src/widget/detail/detail.nav.vue',
        'widgets/widgets.detail.joinList': './src/p/duobao/src/widget/detail/detail.joinList.vue',
        'widgets/widgets.detail.btmNav': './src/p/duobao/src/widget/detail/detail.btmNav.vue',
        'widgets/widgets.detail.number': './src/p/duobao/src/widget/detail/detail.number.vue',
        'widgets/widgets.btmNav.btn.default': './src/p/duobao/src/widget/bottom_nav/btn_nav.default.vue',
        'widgets/widgets.detail.img': './src/p/duobao/src/widget/detail/detail.img.vue',
        'widgets/widgets.number.rule': './src/p/duobao/src/widget/rule/rule.number.vue',
        'widgets/widgets.compute.rule': './src/p/duobao/src/widget/rule/rule.compute.vue',
        'widgets/widgets.order.address': './src/p/duobao/src/widget/order/address.vue',
        'widgets/widgets.order.dialog': './src/p/duobao/src/widget/order/order.dialog.vue',
        'js/utils/docode': './src/p/duobao/src/utils/docode.js',
    },
    output: {
        path: './'+outputPath+'/duobao/src/',
        filename: "[name].js",
        library: ["[name]"],
        libraryTarget: "umd"
    },
    externals: {
        'components': 'components',
        'queryparser': 'queryparser',
        'docode': 'docode',
        'config': 'config',
        'widgets.order.dialog': 'widgets.order.dialog'
    },
    compress: {
        warning: false
    },
    module: {
        loaders: [
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.vue$/, loader: 'vue'},
            {
              test: /\.js$/, loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'gome-hybrid-file?name=/images/[name].[ext]?v=[hash]2&prefix='+ (function(){
                    if(args.gulpCommand == 'watch' || args.gulpCommand == 'dev'){
                        return '.'
                    }else{
                        if(args.platform != 'wap'){
                            return '.'
                        }else{
                            if(args.env == 'uat')
                                return '//10.126.53.39/develop/hybrid/p/duobao/src'
                            else if(args.env == 'live')
                                return '//js.gomein.net.cn/plus/hybrid/p/duobao/src'
                        }
                    }
                })()
            }
        ]
    },
    stats: 'minimal',
}
if(args.gulpCommand == 'build' && args.env == 'live'){
    module.exports.plugins = [
        new webpack.optimize.UglifyJsPlugin({
           warnings: false,
           sourceMap: false,
        }),
    ]
}