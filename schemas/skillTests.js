const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    testName: {
        type: String
    },
    industry: {
        type: String
    },
    duration: {
        type: String
    },
    testContent: {
        type: Array
    },
    applicants : {
        type: Number
    },
    createdDate : {
        type: String
    },
    timestamp : {
        type: Number
    },
    createdBy : {
        type: String
    }
    
},{
    collection: 'tests'
});

module.exports = mongoose.model("tests", testSchema);