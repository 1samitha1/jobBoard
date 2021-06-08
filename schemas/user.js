const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    companyName: {
        type: String,
    },
    email: {
        type: String,
        //required: true,
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
        // required: true
    },
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    textIndex : {
        type: String,
    },
    registered : {
        type: String,
    },
    photo : {
        type: String,
    },
    jobPosition : {
        type: String,
    },
    completed: {
        type: Boolean
    }
},{
    collection: 'users'
});

module.exports = mongoose.model("user", userSchema);

