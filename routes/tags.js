var express = require('express');
var router = express.Router();
var apitags = include('appcode/tagController.js');
var apiauth = include('appcode/authController.js');


/* GET users listing. */
router.get('/', function (req, res) {
    apitags.getAllTag(res);
});

router.post('/get-all-by-location-open', function (req, res) {
    apitags.getAllTagbyLocationOpen(req.body.latitude, req.body.longitude, req.body.distance, res);
});

router.post('/get-all-by-location', apiauth.protectRoute, function (req, res) {
    apitags.getAllTagbyLocation(req.body.latitude, req.body.longitude, req.body.distance, res);
});

router.post('/get-all-within', apiauth.protectRoute, function (req, res) {
    apitags.getAllTagWithin(req.body.bounds, res);
});

router.post('/add', apiauth.protectRoute, function (req, res) {
    var userid = req.tokenInfo.id;
    apitags.addTag(req.body.latitude, req.body.longitude, req.body.info, userid, res);
});

router.post('/update', apiauth.protectRoute, function (req, res) {
    var userid = req.tokenInfo.id;
    apitags.updateTag(req.body.id, req.body.info, userid, res);
});

router.post('/delete', apiauth.protectAdminRoute, function (req, res) {
    var userid = req.tokenInfo.id;
    apitags.updateTag(req.body.id, userid, res);
});

router.get("/tag/:id", apiauth.protectRoute, function (req, res) {
    apitags.getTagbyId(req.params.id, res);
});

module.exports = router;