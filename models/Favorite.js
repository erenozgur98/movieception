const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
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


const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;