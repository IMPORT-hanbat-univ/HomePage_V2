const Sequelize = require('sequelize');

module.exports = class ProjectComment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.STRING(4000),
                allowNull: false,
            },
            group:{ //=모 댓글번호
                type: Sequelize.INTEGER(30),
                allowNull: false,
            },
            sequence: {
                type: Sequelize.INTEGER(30),
                allowNull: false,
            },
            indent: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }

        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ProjectComment',
            tableName: 'projectComments',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.ProjectComment.belongsTo(db.Project);
        db.ProjectComment.belongsTo(db.User);

    }
}