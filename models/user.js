import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      typeOfUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = bcrypt.hashSync(user.password, 10);
        },
      },
    }
  );

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.ParkingLot, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.ParkingSlot, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
