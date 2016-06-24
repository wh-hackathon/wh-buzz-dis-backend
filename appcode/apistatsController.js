var mongoose = require('mongoose');

var apistats = {
    updatestats: function (url){
        var apistats = mongoose.model("apistats");
        apistats.findOne({"url": url}, function (err, apistat) {
            if (apistat) {
                var currCnt = apistat.count;
                apistat.count = currCnt + 1;
                apistat.save(function (err, apistat) { 
                    
                })
            } else {
                var newapistat = new apistats({
                    url: url, 
                    count: 1
                });

                newapistat.save(function () {

                });
            }
        })
    }
}
    
module.exports = apistats;