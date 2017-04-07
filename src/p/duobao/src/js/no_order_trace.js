 require([
        'config',
        'docode',
        'components',
        'fastclick',
        'queryparser',
    ],
    function(
         Config
        , Docode
        , Components
        , FastClick
        , QueryParser){
        //polyfill
        FastClick.attach(document.body);
        window.requestAnimationFrame=(function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {setTimeout(callback, 1000 / 60);}
        }());

         $g.ready().then(function(){
            $g.setTitle("查看物流信息")
        })
})