var config = include('config.js');
var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var apiauth = {

    //Login
    login: function (email, password, res) {
        var users = mongoose.model("users");
        users.findOne(
            { "email": email, "password": password },
            function (err, user) {
                if (err) res.status(400).send({ "error": "Bad Request" });
                else {
                    if (!user) res.status(401).send({ "error": "Invalid Credentials" });
                    else {
                        var payload = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            admin: user.admin
                        }
                        var token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });

                        res.json({
                            success: true,
                            userid: user._id,
                            name: user.name,
                            role: user.admin == true ? "admin" : "user",
                            token: token
                        });
                    }
                }
            }
        );
    },
    
    
    //Social Auth
    socialAuth: function (type, profileid, email, name, token, res) {
        var users = mongoose.model("users");
        users.findOne({ "email": email }, function (err, user) {
            if (err)
                done(err, user);
            
            if (user) {
                if (type == "google") {
                    // update google id and token id
                    user.google = {
                        id: profileid,
                        token: token
                    }
                }
                if (type == "facebook") {
                    // update google id and token id
                    user.facebook = {
                        id: profileid,
                        token: token
                    }
                }
                user.save(function (err, user) {
                    var payload = {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        type: type
                    }
                    var token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });
                    
                    res.json({
                        success: true,
                        userid: user._id,
                        name: user.name,
                        role: user.admin == true ? "admin" : "user",
                        token: token
                    });
                });
                    
                        
            } else {
                //add new user to users with google id and token
                var newuser = new users({
                    name: name,
                    email: email
                });
                
                if (type == "google") {
                    newuser.google = {
                        id: profileid,
                        token: token
                    }
                }
                
                if (type == "facebook") {
                    newuser.facebook = {
                        id: profileid,
                        token: token
                    }
                }
                
                newuser.save(function (err, user) {
                    if (err) {
                        done(err);
                    } else {
                        var payload = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            google: token
                        }
                        var token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });
                        
                        res.json({
                            success: true,
                            userid: user._id,
                            name: user.name,
                            role: "user",
                            token: token
                        });
                    }
                });
                        
                        
            }
        });
    },
    
    //google Authentication
    googleAuth: function (passport) {
        passport.use(new GoogleStrategy({
            
            clientID        : config.googleAuth.clientID,
            clientSecret    : config.googleAuth.clientSecret,
            callbackURL     : config.googleAuth.callbackURL,

        },
        function (token, refreshToken, profile, done) {
            
            var users = mongoose.model("users");
            users.findOne({ "email": profile.emails[0].value }, function (err, user) {
                if (err)
                    done(err, user);
                
                if (user) {
                    // update google id and token id
                    user.google = {
                        id: profile.id,
                        token : token
                    }
                    user.save(function (err, user) {
                        var payload = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            google: token
                        }
                        var token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });
                        
                        done(null, {
                            success: true,
                            message: 'Login Success',
                            token: token
                        });
                    });
                    
                        
                } else {
                    //add new user to users with google id and token
                    var newuser = new users({
                        name: profile.displayName,
                        email: profile.emails[0].value, 
                        google:
                        {
                            id: profile.id,
                            token: token
                        }
                    });
                    
                    newuser.save(function (err, user) {
                        if (err) {
                            done(err);
                        } else {
                            var payload = {
                                id: user._id,
                                email: user.email,
                                name: user.name,
                                google: token
                            }
                            var token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.tokenExpiresIn });
                            
                            done(null, {
                                success: true,
                                message: 'Login Success',
                                token: token
                            });
                        }
                    });
                        
                        
                }
            });
           
        })
        );
    },
    
    //Get Token Information
    getToken: function (req){
        var token = req.body.token || req.query.token || req.headers['token'];
         return jwt.decode(token, config.jwt.secret);
    },
    
    
    //Protected Route
    protectRoute: function (req, res, next){
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['token'];
        
        // decode token
        if (token) {
            
            // verifies secret and checks exp
            jwt.verify(token, config.jwt.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.tokenInfo = decoded;
                    next();
                }
            });

        } else {
            
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false, 
                message: 'No token provided.'
            });
    
        }
    },


    //Protected Route for Admin
    protectAdminRoute: function (req, res, next){
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['token'];
        
        // decode token
        if (token) {
            
            // verifies secret and checks exp
            jwt.verify(token, config.jwt.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, check if admin save to request for use in other routes
                    if (decoded.admin == true) {
                        req.tokenInfo = decoded;
                        next();
                    }
                    else {
                        res.status(401).json({ "error": "Unauthorized access" });
                    }
                    
                }
            });

        } else {
            
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false, 
                message: 'No token provided.'
            });
    
        }
       
    }

};

module.exports = apiauth;