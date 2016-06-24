var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//User Model
var apireqSchema = new Schema({
    url: String,
    count: Number
});

mongoose.model("apistats", apireqSchema);