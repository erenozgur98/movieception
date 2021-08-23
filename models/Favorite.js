const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;


const FavoriteSchema = new Schema(
    {
        userFrom: {
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