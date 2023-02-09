const Sequlize = require("sequelize");

module.exports = class ApplicationQuestion extends Sequlize.Model {
  static init(sequelize) {
    return super.init(
      {
        q1: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "applicationQusetion",
        tableName: "applicationQusetions",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
