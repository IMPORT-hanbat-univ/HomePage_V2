const Sequelize = require('sequelize');

module.exports = class PatchNoteComment extends Sequelize.Model{
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
            sequence: {
                type: Sequelize.STRING(100),
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
    modelName: 'PatchNoteComment',
    tableName: 'patchNoteComments',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
    static associate(db) {
        db.PatchNoteComment.belongsTo(db.PatchNote);
        db.PatchNoteComment.belongsTo(db.User);

    }
}