const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locations = new Schema({
    locations: {
        type: Array
    }
    
},{
    collection: 'locations'
});

module.exports = mongoose.model("locations", locations);