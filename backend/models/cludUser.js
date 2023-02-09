const Sequlize = require("sequelize");

module.exports = class cludUser extends Sequlize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        grade: {
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        blog: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        studentId: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        framework: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        language: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        phoneNumber: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "CludUser",
        tableName: "CludUsers",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
