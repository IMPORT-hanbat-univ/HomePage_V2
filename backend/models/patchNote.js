const Sequelize = require('sequelize');

module.exports = class PatchNote extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(4000),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            order:{//몇번째인지 저장
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING(255),
                allowNull: true,
            }

    },{
    sequelize,
    timestamps: true,
    modelName: 'PatchNote',
    tableName: 'patchNotes',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
    static associate(db) {
        db.PatchNote.belongsTo(db.Project);
        db.PatchNote.hasMany(db.PatchNoteComment);

    }
}