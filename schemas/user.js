const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    companyName: {
        type: String,
       
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String,
        
    },
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        
    },
    userType: {
        type: String,
        required: true
    },
    industries: {
        type: [{
            type: String
        }],
        required: true
    },
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    }
},{
    collection: 'users'
});

//userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);

