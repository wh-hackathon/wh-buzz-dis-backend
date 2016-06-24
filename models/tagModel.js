var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Tag Model
var tagSchema = new Schema( {
    location: {
        type: { type: String },         
        coordinates: [],       // [<longitude>, <latitude>]
    },
 
    /* 
        Display Information should show
        1. Who added the tags
        2. Count of people saying about the size
        2. Count of people saying about the severity
    */

    info: {
            addedby: String,
            shopName: String,
            shopAddress: String, 
            discount: String,
            discountBanner: String,
            likes: Number
           }
});
tagSchema.index({ location: '2dsphere' });

mongoose.model("tags", tagSchema);