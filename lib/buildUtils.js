require ('shelljs/global');
const fs = require('fs');
const versionMap = require('../configs/version.map.js');
const path = require('path')
const generator = require('./generator.js')

exports.isComp = (project) => {
    return versionMap[project].comps
}

exports.isCompPath = (project) => {
    return exports.isComp(project) ? 'b' : 'p'
}
exports.getDistPath = (channel, project) =>{
    return './dist/' + channel + '/' + exports.isCompPath(project) + '/' + project
}
exports.outputTodist = (channel, project) => {
    var distPath = exports.getDistPath(channel, project)
    rm('-rf', distPath)
    if(channel == 'wap'){
        //
    }else{
        rm('-rf', 'release/' + channel + '/' + project + '.zip')
    }
    mkdir('-p', distPath)
    cp('-r', './tmp_dist' + '/' + exports.isCompPath(project) + '/' + project, './dist/' + channel + '/' + exports.isCompPath(project))
    if(channel == 'wap')return
    var config = JSON.stringify(generator.generateConfig(channel, project))
    touch(distPath + '/config.json')
    fs.writeFileSync(distPath + '/config.json', config);
}