'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resident = sequelize.define('Resident', {
    locationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Resident.associate = function(models) {
    // associations can be defined here
    Resident.belongsTo(models.Location, {
      foreignKey: 'locationId',
      // onDelete: 'CASCADE',
      // hooks: true,
    });
  };
  return Resident;
};
