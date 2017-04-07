
//shelljs
require ('shelljs/global');

//node lib
const fs  = require('fs');
const path = require('path');

//utils
const args = require('../lib/argParser.js');
const rev = require('../lib/revHash.js');
const webpackLog = require('../lib/webpack.log.js').webpackLog;
const utils = require('../lib/buildUtils.js');
const generator = require('../lib/generator.js');

//gulp
const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');
const through2 = require('through2')
const Vinyl = require('vinyl');
const zip = require('gulp-zip');
const ejs = require('gulp-ejs');

//webpack
const webpack = require('webpack');


//configs
const CONFIG = require('./config.js').config;
fs.writeFileSync(path.resolve(__dirname, '../src/b/components/src/utils/__config__.js'), new Buffer('module.exports='+JSON.stringify(CONFIG)))                        
const channels = require('../configs/channels.js');
const versionMap = require('../configs/version.map.js');
const webpackConfig = require('./config.js').webpackConfig;


//server
const server = require('./server.js');
if(CONFIG.NODE_ENV != 'production'){
    const port = 3333
    server.listen(port, function(){
        gutil.log('server listening on ' + port)
    });
}


let step = 0;
const stepLength = 4;
function stepOne() {
    if(CONFIG.NODE_ENV == 'production'){
        step++;
    }
    console.log(step)
    if(step == stepLength){
        //done
        release();
    }
}

//start from here
webpackComponent();
webpackProject(args.project);

function webpackComponent(){
    gutil.log('开始components编译')
    function compiled (err, stats){
        webpackLog(err, stats)
        gutil.log('components输出到开发目录')
        gulp.src('./tmp/b/**/*')
            .pipe(gulp.dest('./' + CONFIG.outputPath + '/b'))
            .on('end', () => {
                gutil.log('components输出到开发完成')
                stepOne();
            });
    }
    if(CONFIG.NODE_ENV == 'production'){
        webpack(webpackConfig.comps).run(compiled)
    }else{
        webpack(webpackConfig.comps)
        .watch({
            aggregateTimeout: 100, // wait so long for more changes
            poll: true // use polling instead of native watchers
        }, compiled);
    }
    function compRes() {
        gutil.log('copy core')
        gulp.src(['./src/b/components/src/core/**/*', '!./src/b/components/src/core/less','!./src/b/components/src/core/**/*.less'])
            .pipe(gulp.dest('./' + CONFIG.outputPath + '/b/components/src/core'))
            .on('end', () => {
                gutil.log('copy core end')

                gutil.log('copy vendor')
                gulp.src(['./src/b/components/src/vendor/**/*'])
                    .pipe(gulp.dest('./' + CONFIG.outputPath + '/b/components/src/vendor'))
                    .on('end', () => {
                        gutil.log('copy vendor end')

                        gutil.log('copy utils')
                        gulp.src(['./src/b/components/src/utils/**/*.js', '!./src/b/components/src/utils/config.js', '!./src/b/components/src/utils/__config__.js', '!./src/b/components/src/utils/bridge.js'])
                            .pipe(gulp.dest('./' + CONFIG.outputPath + '/b/components/src/utils'))
                            .on('end', () => {
                                gutil.log('copy utils end')
                                stepOne();
                            })
                    })
            })
    }
    compRes();
    if(CONFIG.NODE_ENV != 'production'){
        gulp.watch(['./src/b/components/src/core/**/*'
                ,'./src/b/components/src/vendor/**/*'
                ,'./src/b/components/src/utils/**/*'], compRes);
    }
}

function webpackProject(project){
    gutil.log('开始'+project+'编译')
    rm('-rf', 'dev')
    function compiled(err, stats){
        webpackLog(err, stats);
        gutil.log(project + '输出到开发目录')

        gulp.src('./tmp/p/' + project + '/**/*')
            .pipe(gulp.dest('./' + CONFIG.outputPath + '/p/' + project))
            .on('end', function(){
                gutil.log(project + '输出到开发目录完成')
                stepOne();
            })
    }
    if(webpackConfig[project]){
        if(CONFIG.NODE_ENV == 'production'){
            webpack(webpackConfig[project]).run(compiled)
        }else{
            webpack(webpackConfig[project])
            .watch({
                aggregateTimeout: 100, // wait so long for more changes
                poll: true // use polling instead of native watchers
            }, compiled)
        }
    }else{
        //传统项目，不走webpack
        stepOne();
    }
    renderWatch(project);
}

function renderWatch(project) {
    function renderHtml() {
        gutil.log(project+'开始编译模板')
        gulp.src('./src/p/' + project + '/src/*.html')
            .pipe(ejs({
                PackConfig: CONFIG,
                dateCatch: '20161227',
                timestamp: '2017031002',//new Date().getTime()
            }).on('error', gutil.log))
            .pipe(gulp.dest('./' + CONFIG.outputPath + '/p/' + project + '/src/'))
            .on('end',function(){
                gutil.log(project+'模板编译结束')
                stepOne();
            })
    }
    function outputLegacy() {
        console.log('outputLegacy: ' + project)
         //for legacy project
        mkdir('-p', CONFIG.outputPath + '/p/' + project + '/src')
        cp('-r', './src/p/' + project + '/src/images', CONFIG.outputPath + '/p/' + project + '/src')
        gulp.src('./src/p/' + project + '/src/less/**/*')
            .pipe(less())
            .pipe(gulp.dest('./src/p/' + project + '/src/css'))
        cp('-r', './src/p/' + project + '/src/css', CONFIG.outputPath + '/p/' + project + '/src')

        cp('-r', './src/p/' + project + '/src/css', CONFIG.outputPath + '/p/' + project + '/src')
        cp('-r', './src/p/' + project + '/src/js', CONFIG.outputPath + '/p/' + project + '/src')
    }
    outputLegacy();
    renderHtml();
    if(CONFIG.NODE_ENV != 'production'){
        gulp.watch('./src/p/' + project + '/src/**/*.html', renderHtml);

        gulp.watch('./src/p/' + project + '/src/js/**/*', outputLegacy);
        gulp.watch('./src/p/' + project + '/src/css/**/*', outputLegacy);
        gulp.watch('./src/p/' + project + '/src/images/**/*', outputLegacy);
    }
}




//webpack 完成后
function release(){
    if(args.platform == 'wap'){
        rm('-rf', 'release/wap')
        console.log('release wap')
        setTimeout(function(){
            buildWap(done);
        })
    }else{
        console.log('release app')
        buildApp(done);
    }
}
//release后，清除暂存文件夹
function done(){
    console.log('finished')
    rm('-rf', 'tmp')
    rm('-rf', 'tmp_dist')
}



function buildApp(cb){
    let endCnt = 0;
    let endIter = 0;
    for(let i=0; i < channels.length; i++){
        endCnt += 2;
        const channel = channels[i];

        utils.outputTodist(channel, 'components')
        //gen pr.mni
        generator.generatePrAndZip(channel, 'components', () => {
            endIter++
            if(endIter == endCnt){
                cb();
            }
        })

        utils.outputTodist(channel, args.project)
        //gen pr.mni
        generator.generatePrAndZip(channel, args.project, () => {
            endIter++
            if(endIter == endCnt){
                cb();
            }
        })
    }
}

function buildWap(cb){
    const compsDistPath =  utils.getDistPath('wap', 'components')
    utils.outputTodist('wap', 'components')
    gulp.src(compsDistPath + '/src/**/*')
        .pipe(gulp.dest('./release/wap/b/components/src'))
        .on('end', function(){
            const projectDistPath = utils.getDistPath('wap', args.project)
            utils.outputTodist('wap', args.project)
            gulp.src(projectDistPath + '/src/**/*')
                .pipe(gulp.dest('./release/wap/p/'+ args.project + '/src'))
                .on('end', cb)
        })
}


