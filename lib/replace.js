var gulp = require('gulp')
var through2 = require('through2')
var fs = require('fs')
var path = require('path')
var timestamp = new Date().getTime();
module.exports = function(){
    return through2.obj(function(file,enc,cb){
        var content = String(file.contents)
        var REG = /<!--@include:\s*([\w\.-_\/]*?)\s*-->|<!--\{\s*?template\s*([\w\.-_\/]*?)\s*\}-->/g
        if(REG.test(content)){
            content.match(REG).forEach(function(item){
                var reg = /<!--@include:\s*([\w\.-_\/]*?)\s*-->|<!--{\s*?template\s*([\w\.-_\/]*?)\s*\}-->/
                var glob = path.resolve(path.dirname(file.path),item.match(reg)[1] || item.match(reg)[2])
                var tmpl = String(fs.readFileSync(glob),'utf-8')
                content = content.replace(reg,tmpl)
            })
        }

        //css js 自动加版本号
        if(content.match(/(<link.*\.css)/)){
            content.replace(/(<link.*\.css)/,RegExp.$1 + '?v=' + timestamp)
        }
        if(content.match(/(<script.*\.js)/)){
            content.replace(/(<link.*\.js)/,RegExp.$1 + '?v=' + timestamp)
        }
        if(content.match(/(\.bmp|\.gif|\.jpg|\.png)/)){
            content.replace(/(\.bmp|\.gif|\.jpg|\.png)/,RegExp.$1 + '?v=' + timestamp)
        }
        file.contents = new Buffer(content,'utf-8')
        cb(null,file)
    })
}
