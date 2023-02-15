const Sequelize = require('sequelize');

module.exports = class CardPostComment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            group:{ //=모 댓글번호
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            sequence: {//한 그룹안에서 댓글 순서
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            indent: { //들여쓰기 횟수
                type: Sequelize.STRING(100),
                allowNull: true,
            }

    },{
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'CardPostComment',
    tableName: 'cardPostComments',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
    static associate(db) {
        db.CardPostComment.belongsTo(db.User);
        db.CardPostComment.belongsTo(db.CardPost);
    }
}