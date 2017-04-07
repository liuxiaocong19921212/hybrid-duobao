require ('shelljs/global');

const CONFIG = require('../bin/config.js').config;
const versionMap = require('../configs/version.map.js');
const buildUtils = require('./buildUtils.js');

const gulp = require('gulp')
const zip = require('gulp-zip')
const through2 = require('through2')
const rev = require('./revHash.js')
const path = require('path')
const Vinyl = require('vinyl')
/**
 * 混合app的config.json生成器
 */
exports.generateConfig = function(channel, project){
    if(channel === 'wap')return false;
    const sdk = channel.split('/')[1];
    const deps = versionMap[project].deps ? versionMap[project].deps.map((dep) => {
        let plugVersion = 0
        if(dep.match(/plugin_core/)){
            plugVersion = exports.generateVersion(versionMap[dep].version[sdk]);
        }else{
            plugVersion = exports.generateVersion(versionMap[dep].version);
        }
        return {
            plugId: dep,
            plugVersion,
        }
    }) : null;
    let platform = 'all'
    if(project == 'plugin_core_ios'){
        platform = 'ios'
    }else if (project == 'plugin_core_android'){
        platform = 'android'
    }else {
        platform = 'all'
    }
    let config = {
        supportSdk: sdk.match(/\d/)[0],
        plugVersion: exports.generateVersion(versionMap[project].version),
        plugId: project,
        platform,
        isComponent: versionMap[project].comps.toString()
    }
    if(deps){
        config.deps = deps
    }
    if(channel.match(/new/)){
        config.name = project
        config.describe = project + '_' + CONFIG.ENV + '包'
        config.versionName = 'v' + exports.generateVersion(versionMap[project].version)
    }
    return config
}

exports.generateVersion = (intVersion) => {
    const bigVersion = Math.floor(intVersion / 20);
    const smallVersion = intVersion % 20;
    return bigVersion + '.' + smallVersion;
}



exports.generatePrAndZip = (channel, project, cb) => {
    if(project.match(/wap/))return;
    var distPath = buildUtils.getDistPath(channel, project);
    var pr = {}
    gulp.src(distPath + '/src/**/*')
        .pipe(through2.obj((file, enc, cb) => {
            if(Buffer.isBuffer(file.contents)){
                const filePath = file.path
                                     .replace(file.cwd,'')
                                     .replace(/\\/g,'/')
                                     .replace('/dist/' + channel + '/' + project + '/src', '');
                pr[filePath] = rev(file.contents);
            }
            cb()
        },function (cb) {
            var file = new Vinyl({
                cwd: '/',
                base: '/',
                path: '/pr.mni',
                contents: new Buffer(JSON.stringify(pr))
            })
            this.push(file)
            cb()
        }))
        .pipe(gulp.dest(distPath))
        .on('end', () => {
            gulp.src(distPath + '/**/*')
                .pipe(zip(project + '-' + exports.generateVersion(versionMap[project].version) + '.zip'))
                .pipe( gulp.dest( path.join('release', channel) ) )
                .on('end', cb)
        })
}