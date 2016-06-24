var mongoose = require('mongoose');

var apiusers = {
    
    //Add User
    addUser: function (name, email, password, admin, res){
        
        var userModel = mongoose.model("users");

        var user = new userModel({
            name: name,
            email: email, 
            password: password,
            admin: admin
        });
        

        user.save(function (err, user) {
            if (err) {
                console.error(err);
                if (err.code == 11000)
                    res.status(409).send({ "error": "User already exists" });
                else
                res.status(500).send( { "error": err });
            } else
                res.send( { "result": "User Created" });
        });
    },
    


    //Update User
    updateUser: function (id, name, email, res){
        var users = mongoose.model("users");
        users.findById(id, function (err, user) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            };
            
            user.name = name;
            user.email = email;
            user.save(function (err, user) {
                if (err) {
                    console.error(err);
                    res.status(400).send({ "error": err });
                }
                else
                    res.send({ "result": "User Updated" });
            })
        });

    },

    //Get user by id
    getUserbyId: function (id, res){
        var users = mongoose.model("users");
        users.findById(id, function (err, user) {
            if (err) {
                console.error(err)
                res.status(500).send({ "error": err });
            };

            res.json(user);
        })
    },


}

module.exports = apiusers;