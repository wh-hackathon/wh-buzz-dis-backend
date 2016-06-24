var config = {}

config.connectionString = 'mongodb://avarade:fr3sca!@ds023054.mlab.com:23054/buzz-dis';
config.apiServerPort = process.env.PORT || 3000;

config.jwt = {
    secret: "jeje-fukat-tete-paushtik",
    tokenExpiresIn: 28800 // 28800 seconds = 8 hours
}


config.googleAuth = {
    clientID: "clientID.apps.googleusercontent.com",
    clientSecret: "clientSecret",
    callbackURL: "http://localhost:"+ config.apiServerPort +"/auth/google/callback"
}


module.exports = config;