'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define('Gallery', {
    author: DataTypes.TEXT,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Gallery;
};