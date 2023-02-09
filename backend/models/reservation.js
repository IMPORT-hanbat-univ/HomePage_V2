const Sequlize = require("sequelize");

module.exports = class Reservation extends Sequlize.Model {
  static init(sequelize) {
    return super.init(
      {
        startDate: {
          type: Sequelize.DATE(100),
          allowNull: false,
        },
        endtDate: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        time: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Reservation",
        tableName: "Reservations",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
