module.exports = class ListPost extends Sequelize.Model{
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
            order:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(30),
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
    modelName: 'ListPost',
    tableName: 'listPosts',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
}