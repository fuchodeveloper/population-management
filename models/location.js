'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    malePopulation: DataTypes.INTEGER,
    femalePopulation: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Resident, {
      foreignKey: 'locationId',
    });
  };
  return Location;
};
