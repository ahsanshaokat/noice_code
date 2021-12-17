module.exports = (sequelize, DataTypes) => {
  const ParkingSlot = sequelize.define('ParkingSlot', {
    spotname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'free',
    },
    parkingLotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  ParkingSlot.associate = function(models) {
    // associations can be defined here
    ParkingSlot.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    ParkingSlot.hasOne(models.CarSlot, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
    });
    ParkingSlot.belongsTo(models.ParkingLot, {
      foreignKey: 'parkId',
      onDelete: 'CASCADE',
    });
  };
  return ParkingSlot;
};
