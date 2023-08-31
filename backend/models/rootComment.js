const Sequelize = require('sequelize');

module.exports = class RootComment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.TEXT('long'),
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


        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'RootComment',
            tableName: 'rootComments',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        });
    }
    static associate(db) {
        db.RootComment.belongsTo(db.User);
        db.RootComment.belongsTo(db.RootPost);

    }

}