const Sequlize = require("sequelize");

    module.exports = class ApplicationAnswer extends Sequlize.Model {
        static init(sequelize) {
            return super.init(
                {
                    answer1: {
                        type: Sequelize.DATE(100),
                        allowNull: true,
                    },
                    answer2: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer3: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer4: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer5: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer6: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer7: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer8: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer9: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer10: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer11: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer12: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer13: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer14: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer15: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer16: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer17: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer18: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer19: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer20: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer21: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer22: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer23: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer24: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    answer25: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                },
                {
                    sequelize,
                    timestamps: true,
                    underscored: false,
                    modelName: "ApplicationAnswer",
                    tableName: "applicationAnswers",
                    paranoid: true,
                    charset: "utf8",
                    collate: "utf8_general_ci",
                }
            );
        }

  static associate(db) {}
};
