const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplications = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    attachment: {
        type: String
    },
    jobId: {
        type: Array
    },
    createdBy : {
        type: Number
    },
    timestamp : {
        type: Number
    }
    
},{
    collection: 'jobApplications'
});

module.exports = mongoose.model("jobApplications", jobApplications);