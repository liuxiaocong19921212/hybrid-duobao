var gutil = require('gulp-util');

exports.webpackLog = function(err, stats){
    if (err) { throw new gutil.PluginError('webpack:build', err); }
    gutil.log('[webpack:build]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true,
        minimal: true,
    }));
};