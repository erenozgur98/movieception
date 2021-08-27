const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    }
);


const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;