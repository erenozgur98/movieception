const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
       
    }
);


const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;