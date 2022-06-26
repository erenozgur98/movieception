const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorites extends Model { }

Favorites.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        movieFavorites: {
            type: DataTypes.JSON
        },
        showFavorites: {
            type: DataTypes.JSON
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'favorites'
    }
)

module.exports = Favorites;