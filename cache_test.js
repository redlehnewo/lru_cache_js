var LRUCache = (function(){

    var ageId = 0;
    var maxSize = 4;
    var currSize = 0;
    var cache = {};

    function get(key) {
        return cache[key] ? cache[key].value : -1;
    }

    function set(key, value) {
        if(cache[key]) {
            cache[key].age = ageId;
        } else {
            if(currSize === maxSize) {
                //-- Invalidate someone
                evict(cache);
                cache[key] = { value : value, age : ageId };
            } else {
                ++currSize;
                cache[key]= { value : value, age : ageId };
            }
        }
        ++ageId;
    }

    function evict(cache) {
        var oldestAge = ageId;
        var oldestKey = '';
        Object.keys(cache).forEach(function(key){
            if(cache[key].age < oldestAge) {
                oldestAge = cache[key].age;
                oldestKey = key;
            }
        });
        delete cache[oldestKey];
    }

    return {
        get : get,
        set : set,
        print : function(){
            /** INFO **/console.info('>>> CACHE >>>');
            /** INFO **/console.info(cache);
        }

    }
})();


