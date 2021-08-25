const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
    {
       
    }
);


const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;