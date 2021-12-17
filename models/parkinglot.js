module.exports = (sequelize, DataTypes) => {
  const ParkingLot = sequelize.define('ParkingLot', {
    parkingname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    initialSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  ParkingLot.associate = function(models) {
    // associations can be defined here
    ParkingLot.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    ParkingLot.hasMany(models.ParkingSlot, {
      foreignKey: 'parkId',
      onDelete: 'CASCADE',
    });
  };
  return ParkingLot;
};
