const Sequelize = require('sequelize');

module.exports = class Project extends Sequelize.Model{
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
            order:{
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
    modelName: 'Project',
    tableName: 'projects',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
}