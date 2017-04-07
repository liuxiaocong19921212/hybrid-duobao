(function (window, factory) {
   if (typeof exports === 'object') {
      module.exports = factory();
   } else if (typeof define === 'function' && define.amd) {
      define(factory);
   } else {
      window.QueryParser = factory();
   }
})(this, function () {
    var QueryParser = {
        parse: function(query){
            query = query.replace(/^\?/,'')
            var arr = query.split(/&/)
            var result = {}
            for(var i=0; i<arr.length; i++){
                var keyvalue = arr[i].split(/\=/)
                result[keyvalue[0]] = keyvalue[1]
            }
            return result
        },
        queryify: function(json,prefix){
            prefix = prefix || "?"
            var query = prefix
            for(var key in json){
                query += (key + '=' +json[key]) + '&'
            }
            return query.replace(/\&$/,'')
        }
    }
    return QueryParser
});