const Sequlize = require("sequelize");

module.exports = class ProjectapplicationQuestion extends Sequlize.Model {
  static init(sequelize) {
    return super.init(
      {
        q1: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        q25: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        category: {
          type: Sequlize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ProjectapplicationQuestion",
        tableName: "ProjectapplicationQuestions",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
