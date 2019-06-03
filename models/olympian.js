'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    team: DataTypes.STRING,
    games: DataTypes.STRING,
    sport: DataTypes.STRING,
    event: DataTypes.STRING,
    medal: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    // associations can be defined here
  };
  return Olympian;
};