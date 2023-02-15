const Sequelize = require('sequelize');

module.exports = class ProjectapplicationQuestion extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                question1: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                question2: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question3: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question4: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question5: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question6: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question7: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question8: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question9: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question10: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question11: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question12: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question13: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question14: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question15: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question16: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question17: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question18: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question19: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question20: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question21: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question22: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question23: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question24: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                question25: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                category: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "ProjectapplicationQuestion",
                tableName: "projectapplicationQuestions",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.ProjectapplicationQuestion.belongsTo(db.Project);
        db.ProjectapplicationQuestion.hasMany(db.ProjectapplicationAnswer);

    }
}