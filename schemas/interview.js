const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interview = new Schema({
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
    collection: 'interviews'
});

module.exports = mongoose.model("interview", interview);