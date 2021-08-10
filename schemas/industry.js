const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const industries = new Schema({
    industries: {
        type: Array
    }
    
},{
    collection: 'industries'
});

module.exports = mongoose.model("industries", industries);