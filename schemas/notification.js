const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    timestamp: {
        type: Number
    },
    read : {
        type: Boolean
    },
    userId : {
        type: String
    },
    category : {
        type: String
    }  
},{
    collection: 'notifications'
});

module.exports = mongoose.model("notification", notification);