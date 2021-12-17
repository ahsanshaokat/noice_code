module.exports = (sequelize, DataTypes) => {
  const CarSlot = sequelize.define('CarSlot', {
    entry_timestamp: { type: DataTypes.DATE, allowNull: false },
    exit_timestamp: { type: DataTypes.DATE, allowNull: true },
    allocated_duration: { type: DataTypes.INTEGER, allowNull: false },
    occupant_id: { type: DataTypes.STRING, allowNull: false },
    carSlotId: { type: DataTypes.INTEGER, allowNull: false },
  });
  CarSlot.associate = function(models) {
    // associations can be defined here
    CarSlot.belongsTo(models.ParkingSlot, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
    });
  };
  return CarSlot;
};
