const user = require('../models/loginModel')
const mongoose = require('mongoose');
var crypto=require('crypto');

module.exports = {
    adduser: function (req, res) {
        //console.log("Request Body : ", req.body);
		var salt = crypto.randomBytes(16).toString('hex');
		var pass = crypto.pbkdf2Sync(req.body.password, salt,1000, 64, `sha512`).toString(`hex`);
        const usr = new user({name:req.body.name, username: req.body.username, email:req.body.email, mob:req.body.mobile, hash: pass, salt:salt });
        //console.log(usr);

        mongoose.connect('mongodb://localhost/accounts', function (error) {
            if (!error) {
				user.count({ username: req.body.username })
				.then((count) => {
					if (count > 0) {
						console.log('Username exists.');
						res.status(500).send("ERROR");
					} else {
						console.log('Username does not exist.');
					}
				})
                usr.save(function (err, result) {
                    if (!err) {
                        //console.log("Save Success");
                        res.status(201).send(result);
                    } else {
                        res.status(500).send(err);
                    }
                })

            }
        })
    },
    getusers: function (req, res) {
		
		var usn = req.body.username;
		var password = req.body.password;
        mongoose.connect('mongodb://localhost/accounts', function (error) {
            if (!error) {
                user.find({username:usn}, function (err, results) {
					if(typeof results[0]=='undefined' && !results[0])
					{
						res.status(500).send(err);
					}
                    else if (!err) {
						var salt=results[0].salt;
						var hash=results[0].hash;
						//console.log(results)
						var pass = crypto.pbkdf2Sync(password,salt,1000, 64, `sha512`).toString(`hex`);
						//console.log(pass)
						if(pass === hash)
						{
							console.log("Success");
							res.status(201).send(results);
						}
						else
						{
							console.log("Error");
							res.status(500).send(err);
						}
                    }else{
                        res.status(500).send(err);
                    }
                });
            }
        })
    }
}