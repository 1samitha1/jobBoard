const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaries = new Schema({
    salaries: {
        type: Array
    }
    
},{
    collection: 'salaries'
});

module.exports = mongoose.model("salaries", salaries);