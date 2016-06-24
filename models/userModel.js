var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//User Model
var userSchema = new Schema( {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    admin: Boolean,
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token : String
    }
});

mongoose.model("users", userSchema);

var userTokenSchema = new Schema({
    token : String,
    expires: Number,

});

mongoose.model("usertokens", userTokenSchema)