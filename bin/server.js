var path = require('path');

var koa = require('koa');
var server = koa();

var CONFIG = require('./config.js').config

var staticServer = require('koa-static');
server.use(staticServer(path.resolve(__dirname, '..' , CONFIG.outputPath)));
var Router = require('koa-router');
var router = new Router();

var render = require('koa-ejs');


render(server, {
    root: path.join(__dirname, '../src'),
    layout: '__layout',
    viewExt: '',
    cache: false,
    debug: true
});

/*router.get('/p/:project/src/:entry', function * (next){
    yield this.render('p/' + this.params.project + '/src/' + this.params.entry, {
        PackConfig: CONFIG,
        layout:false
    })
})*/

server.use(router.routes());

server.on('error', function(err,ctx){
	console.log(err);
});   

module.exports = server;
