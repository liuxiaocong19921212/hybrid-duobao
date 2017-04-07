//webpack.config.js
var path = require('path')
var webpack = require("webpack")
var args = require('../lib/argParser.js')
var outputPath = './tmp/p/cms/src'
var filename = 'build.js';
var CONFIG = require('../bin/config.js').config;
var CopyWebpackPlugin = require('copy-webpack-plugin');
//if(CONFIG.NODE_ENV == 'production' && CONFIG.PLATFORM == 'WAP' && CONFIG.ENV == 'LIVE' ){
//    filename = 'build.[chunkhash].js'
//}

module.exports = {
    context: path.resolve(__dirname , '..'),
    entry: './src/p/cms/src/app.js',
    output: {
        path: outputPath,//'../../../../../dist/p/cms/0.1/src',//path.join(__dirname,'../../../dist/components/swiper'),
        filename: filename,
    },
    externals: {
        'components': 'components'
    },
    compress: {
        warning: false
    },
    eslint: {
        configFile: './.eslintrc'
    },
    module: {
        loaders: [
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.html$/, loader: 'html'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.vue$/, loader: 'vue'},
            {
              test: /\.js$/, 
              loaders: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'gome-hybrid-file?name=/images/[name].[ext]?v=[hash]1&prefix=' + (function(){
                    if( CONFIG.NODE_ENV != 'production'){
                        return '.'
                    }
                    if(args.gulpCommand == 'watch' || args.gulpCommand == 'dev'){
                        return 'http://js.atguat.com.cn/mobile/cms/prom/hybrid/p/cms/src'
                    }else{
                        if(args.platform != 'wap'){
                            return 'http://js.atguat.com.cn/mobile/cms/prom/hybrid/p/cms/src'
                        }else{
                            if(args.env == 'uat')
                                return 'http://js.atguat.com.cn/mobile/cms/prom/hybrid/p/cms/src'
                            else if(args.env == 'live')
                                return 'http://js.gomein.net.cn/mobile/cms/prom/hybrid/p/cms/src'
                        }    
                    }
                    
                })()
            }
        ]
    },
    stats: 'minimal',
    plugins: [
     
    ],
}
if(CONFIG.NODE_ENV == 'production' && CONFIG.PLATFORM == 'WAP' && CONFIG.ENV == 'LIVE'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
           warnings: false,
           sourceMap: false,
        })
    )
}