const Sequelize = require('sequelize');

module.exports = class PatchNote extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            tagF: { //1
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            tagS: { //2
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            tagT: { //3
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            category: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            order:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING(255),
                allowNull: true,
            }
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
}