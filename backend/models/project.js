const Sequelize = require('sequelize');

module.exports = class Project extends Sequelize.Model{
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
            tagF: { //1
                type: Sequelize.STRING(25),
                allowNull: true,
            },
            tagS: { //2
                type: Sequelize.STRING(25),
                allowNull: true,
            },
            tagT: { //3
                type: Sequelize.STRING(25),
                allowNull: true,
            },
            file: {
                type: Sequelize.STRING(1000),
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
    static associate(db) {
        db.Project.hasMany(db.UserProject);
        db.Project.hasMany(db.PatchNote);
        db.Project.hasMany(db.ProjectapplicationQuestion);
        db.Project.hasMany(db.ProjectComment);

    }
}