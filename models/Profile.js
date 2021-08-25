const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
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


const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;