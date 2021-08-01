const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminder = new Schema({
    title: {
        type: String
    },
    timestamp: {
        type: Number
    },
    content : {
        type: String
    },
    canidateName : {
        type: String
    },
    jobId : {
        type: String
    },
    candidateId : {
        type: String
    },
    companyId : {
        type: String
    }  
},{
    collection: 'reminders'
});

module.exports = mongoose.model("reminder", reminder);