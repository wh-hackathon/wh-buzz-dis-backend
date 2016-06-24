var express = require('express');
var router = express.Router();
//Social Login using passport
var passport = require('passport');
var apiauth = include('appcode/authController.js');


/* GET users listing. */
router.get('/', function (req, res) {
    res.send('check auth');
});

router.post('/login', function (req, res) {
    apiauth.login(req.body.email, req.body.password, res);
});

router.post('/social', function (req, res) {
    apiauth.socialAuth(req.body.type, req.body.profileid, req.body.email, req.body.name, req.body.token, res);
});

apiauth.googleAuth(passport);
//Google Authentication
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/google/callback',
            passport.authenticate('google', {
}), function (req, res) { 
    res.render('googleauth', { title: 'Google Authentication Successful', token: req.user.token });
    //res.send(req.user);
});

module.exports = router;