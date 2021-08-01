const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testResult = new Schema({
    candidate: {
        type: String
    },
    timestamp: {
        type: Number
    },
    result : {
        type: String
    },
    candidateId : {
        type: String
    },
    testId : {
        type: String
    },
    testName : {
        type: String
    },
    marks : {
        type: Number
    },
    industry : {
        type: String
    }, 
    companyId : {
        type: String  
    }
},{
    collection: 'testResults'
});

module.exports = mongoose.model("testResult", testResult);