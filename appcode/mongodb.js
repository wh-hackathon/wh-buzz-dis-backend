var mongoose = require("mongoose");
var config = include('config.js');

var fs = require("fs");

var uristring = config.connectionString;
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});


fs.readdirSync('./models').forEach(function (filename) {
    if (~filename.indexOf(".js")) include('models/' + filename);
}
);

module.exports = mongoose;
