var mongoose = require('mongoose');

var apitags = {
    
    //Add Tag
    addTag: function (latitude, longitude, info, userid, res){
        var tagModel = mongoose.model("tags");

        var coords = [];
        coords[0] = longitude;
        coords[1] = latitude;
        info.addedby = userid;

        var tag = new tagModel({
            location: { type: 'Point', coordinates: coords.map(Number) },
            info: info,
        });

        tag.save(function (err, tag) {
            if (err) {
                console.error(err);
                res.status(500).send( { "error": err });
            } else
                res.send( { "result": "Tag Created" });
        });
    },

    //Update Tag
    updateTag: function (id, info, userid, res){
        var tags = mongoose.model("tags");
        info.addedby = userid;
        tags.findOneAndUpdate(
            {_id:id},
            {$push: {info: info}},
            function (err, tag) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            } else 
                res.send( { "result": "Tag Updated" });
        });
    },

    //Get tag by id
    getTagbyId: function (id, res){
        var tags = mongoose.model("tags");
        tags.findById(id, function (err, tag) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            };
            res.send(tag);
        })
    },
    
    //Get All tag by id
    getAllTag: function (res){
        var tags = mongoose.model("tags");
        tags.find({},function (err, tags) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            };
            res.send(tags);
        })
    },
    
    //Get All tag by location
    getAllTagbyLocation: function (latitude, longitude, distance, res){
        var tags = mongoose.model("tags");
        var coords = [];
        coords[0] = longitude;
        coords[1] = latitude;
        // $maxDistance: distance * 1609.34
        tags.find({ location: { $geoNear: { type: 'Point', coordinates:coords }, $maxDistance: distance * 1000}}, function (err, tags) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            };
            res.send(tags);
        })
    },

    getAllTagbyLocationOpen: function (latitude, longitude, distance, res){
        this.getAllTagbyLocation(latitude, longitude, distance, res);
    },

    //Update Likes
    updateLikes: function (id, res){
        var tags = mongoose.model("tags");
        var incLikes = "info.likes";        
        var action = {};
        action[incLikes] = 1;
        tags.findOneAndUpdate(
            {_id:id},
            {$inc: action},
            function (err, tag) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            } else 
                res.send( { "result": "Tag Updated" });
        });
    },

    //Get All tag by location
    getAllTagWithin: function (bounds, res) {
        var tags = mongoose.model("tags");
        tags.find({ "location" : { "$geoWithin" : { "$box" : bounds} } }, function (err, tags) {
            // [[18.599237485633843, 18.597839311495797], [73.80818474998057, 73.80456645001948]]
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            };
            res.send(tags);
        })
    },
    
}

module.exports = apitags;