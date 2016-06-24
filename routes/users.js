var express = require('express');
var router = express.Router();
var apiusers = include('appcode/userController.js');
var apiauth = include('appcode/authController.js');

var jwt = require("jsonwebtoken");

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/add', function (req, res) {
    apiusers.addUser(req.body.name, req.body.email, req.body.password, req.body.admin, res);
});

router.post('/update', apiauth.protectRoute, function (req, res) {
    apiusers.updateUser(req.body.id, req.body.name, req.body.email, res);
});

router.get("/user/:id", apiauth.protectRoute, function (req, res) {
    apiusers.getUserbyId(req.params.id, res);
});

//Example of protected routes*************************************************

//Example of protected route for logged in user
router.get("/protected", apiauth.protectRoute, function (req, res) {
    
    //This is example of getting token info sent by user in header which is saved in req.tokenInfo
    var tokeninfo = req.tokenInfo;
    // Values available in token id, email, name, admin
    res.send(tokeninfo.email);
});


//Example of protected Admin route
router.get("/protectadmin", apiauth.protectAdminRoute, function (req, res) {
    res.send("this is protected Admin route");
});


//Example of protected route*************************************************


module.exports = router;
