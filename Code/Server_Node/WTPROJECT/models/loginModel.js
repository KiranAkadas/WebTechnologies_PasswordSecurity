const mongoose = require('mongoose')

signUpSchema = new mongoose.Schema({    
    name:String,
	username:{ type:String,unique:true },
    email:String,
	mob:Number,
	hash:String,
	salt:String
});

module.exports = mongoose.model('User',signUpSchema)