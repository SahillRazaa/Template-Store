'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user'
      });
      Favorite.belongsTo(models.Templates, {
        foreignKey: 'templateId',
        as: 'template'
      });
    }
  }
  Favorite.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { 
        model: 'Users',
        key: 'id'
      }
    },
    templateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { 
        model: 'Templates',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorite;
};