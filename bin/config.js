var args = require('../lib/argParser.js');
var fs  = require('fs');
var path = require('path');


exports.config = {
    NODE_ENV: process.env.NODE_ENV.trim(),
    //defaults
    PLATFORM: 'APP',
    SDK: 'ALL',
    UPDATE: 'TRUE',
    UPGRADE: 'FALSE',
    outputPath: (process.env.NODE_ENV.trim() == 'production') ? 'tmp_dist' : 'dev',
}

for(var key in args){
    exports.config[key.toUpperCase()] = args[key].toString().toUpperCase()
}

exports.webpackConfig = {
    comps: require('../configs/webpack.config.components.js'),
    // cms: require('../configs/webpack.config.cms.js'),
    duobao: require('../configs/webpack.config.duobao.comps.js')
}