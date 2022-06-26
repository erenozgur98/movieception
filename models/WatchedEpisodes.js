const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WatchedEpisodes extends Model { }

WatchedEpisodes.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        watchedEpisodes: {
            type: DataTypes.JSON
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'watchedepisodes'
    }
)

module.exports = WatchedEpisodes;