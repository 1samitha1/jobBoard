const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplications = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    attachment: {
        type: String
    },
    jobId: {
        type: String
    },
    createdBy : {
        type: String
    },
    timestamp : {
        type: Number
    },
    appliedBy : {
        type: String
    },
    jobTitle : {
        type: String
    },
    companyName : {
        type: String
    },
    accepted : {
        type: Boolean
    }
    
},{
    collection: 'jobApplications'
});

module.exports = mongoose.model("jobApplications", jobApplications);