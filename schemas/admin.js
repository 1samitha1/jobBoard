const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    registered : {
        type: String
    },
    completed : {
        type: Boolean
    },
    userName: {
        type: String
    },
    userType: {
        type: String
    }
   
    
},{
    collection: 'users'
});

module.exports = mongoose.model("admin", adminSchema);