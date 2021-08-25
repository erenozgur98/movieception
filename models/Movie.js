const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        movieId: {
            type: String,
            required: true,
        },
        movieTitle: {
            type: String,
            required: true
        },
        movieImage: {
            type: String,
            required: true
        },
    }
);


const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;