'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CarSlots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      entry_timestamp: {
        type: Sequelize.DATE,
      },
      exit_timestamp: {
        type: Sequelize.DATE,
      },
      allocated_duration: {
        type: Sequelize.INTEGER,
      },
      occupant_id: {
        type: Sequelize.STRING,
      },
      carSlotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'ParkingSlots',
          key: 'id',
          as: 'carSlotId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CarSlots');
  }
};