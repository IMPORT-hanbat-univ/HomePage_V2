const Sequlize = require("sequelize");

module.exports = class ProjectapplicationAnswer extends Sequlize.Model {
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ProjectapplicationAnswer",
        tableName: "ProjectapplicationAnswers",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
