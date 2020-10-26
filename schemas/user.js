const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    collection: 'users'
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users", userSchema);

