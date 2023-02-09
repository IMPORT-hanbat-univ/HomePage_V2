const Sequlize = require("sequelize");

module.exports = class ApplicationAnswer extends Sequlize.Model {
  static init(sequelize) {
    return super.init(
      {
        a1: {
          type: Sequelize.DATE(100),
          allowNull: true,
        },
        a25: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        userId: {
          type: Sequlize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "applicationAnswer",
        tableName: "applicationAnswers",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
