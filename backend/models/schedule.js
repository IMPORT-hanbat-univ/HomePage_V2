const Sequlize = require("sequelize");

module.exports = class Schedule extends Sequlize.Model {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        order: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Schedule",
        tableName: "Schedules",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }}
