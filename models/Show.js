const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema(
    {
        
    }
);


const Show = mongoose.model('Show', ShowSchema);

module.exports = Show;