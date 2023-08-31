const Sequelize = require('sequelize');

module.exports = class ClubUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                department: {//학과
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                grade: {
                    type: Sequelize.STRING(10),
                    allowNull: true,
                },
                blog: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                github_url:{
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                framework: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                language: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },

            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "ClubUser",
                tableName: "clubUsers",
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci',
            }
        );
    }
    static associate(db) {
        db.ClubUser.belongsTo(db.User);
    }

};