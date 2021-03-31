const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    salary: {
        type: String,
    },
    description: {
        type: String,
    },
    industry: {
        type: String,
    },
    startDate : {
        type: String,
    },
    expireDate : {
        type: String,
    },
    expireTimestamp : {
        type: Number,
    },
    applicants : {
        type: Number,
    },
    views : {
        type: Number,
    },
    companyName: {
        type: String,
    },
    companyImg: {
        type: String,
    },
    companyId: {
        type: String,
    },
    type: {
        type: String,
    },
    textIndex : {
        type: String,
    },
    createdBy: {
        type: String,
    }
    
},{
    collection: 'jobs'
});

module.exports = mongoose.model("job", jobSchema);