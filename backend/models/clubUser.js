const Sequelize = require('sequelize');

module.exports = class ClubUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
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
                github_url:{
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
                modelName: "ClubUser",
                tableName: "clubUsers",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.ClubUser.belongsTo(db.User);
        db.ClubUser.hasMany(db.CardPost);
        db.ClubUser.hasMany(db.RootPost);
        db.ClubUser.hasMany(db.UserProject);
        db.ClubUser.hasMany(db.ProjectapplicationAnswer);
        db.ClubUser.hasMany(db.Reservation);
        db.ClubUser.hasMany(db.Schedule);
    }

};