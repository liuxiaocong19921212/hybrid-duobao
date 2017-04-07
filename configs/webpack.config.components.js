//webpack.config.js
var path = require('path')
var webpack = require("webpack")
var args = require('../lib/argParser.js')
var filename = 'components.js';
var CONFIG = require('../bin/config.js').config;
var CopyWebpackPlugin = require('copy-webpack-plugin');
//if(CONFIG.NODE_ENV == 'production' && CONFIG.PLATFORM == 'WAP' && CONFIG.ENV == 'LIVE' ){
//    filename = 'components.[chunkhash].js'
//}
var config = function(tar){
    var outputProjectPath = tar ? "p/" + args.project : 'b/components'
    var outputPath = './tmp/' + outputProjectPath + '/src'
    var _conf = {
        context: path.resolve(__dirname , '..'),
        entry: './src/b/components/src/comp.js',
        output: {
            path: outputPath,//'../dev/b/components/src',
            filename: filename,
            library: ['components'],
            libraryTarget: 'umd',
        },
        module: {
            loaders: [
                {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
                {test: /\.css$/, loader: 'style!css'},
                {test: /\.vue$/, loader: 'vue'},
                {
                test: /\.js$/, 
                loaders: ['babel-loader', 'eslint-loader'],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'gome-hybrid-file?name=/images/[name].[ext]?v=[hash]1&prefix='+ (function(){
                        if(args.gulpCommand == 'watch' || args.gulpCommand == 'dev'){
                            //return '../../../b/components/src'
                            if(args.project == 'cms' && CONFIG.NODE_ENV == 'production')
                                return  '//js.atguat.com.cn/mobile/cms/prom/hybrid/'+ outputProjectPath +'/src'
                            else
                                return '../../../' + outputProjectPath + '/src'
                        }else{
                            if(args.platform != 'wap'){
                                return '../../../' + outputProjectPath + '/src'
                            }else{
                                if(args.env == 'uat'){
                                    if(args.project == 'cms' && CONFIG.NODE_ENV == 'production')
                                        return '//js.atguat.com.cn/mobile/cms/prom/hybrid/' + outputProjectPath + '/src'
                                    else
                                        return '../../../' + outputProjectPath + '/src'
                                }
                                else if(args.env == 'live'){
                                    if(args.project == 'cms')
                                        return '//js.gomein.net.cn/mobile/cms/prom/hybrid/' + outputProjectPath + '/src'
                                    else
                                        return '//js.gomein.net.cn/plus/hybrid/' + outputProjectPath + '/src'
                                }
                            }
                        }
                    })()
                },
            ]
        },
        stats: 'minimal',
        plugins: [
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../node_modules/gome-bridge/dist/gomeBridge.js'),
                to: path.resolve(outputPath, 'utils/gomeBridge.js'),
            }])
        ],
    }
    if(CONFIG.NODE_ENV == 'production' && CONFIG.PLATFORM == 'WAP' && CONFIG.ENV == 'LIVE'){
        _conf.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            sourceMap: false,
            })
        )
    }
    return _conf
}

module.exports = [config(), config(args.project)]