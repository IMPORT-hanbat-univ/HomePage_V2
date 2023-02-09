module.exports = class RootComment extends Sequelize.Model{
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
        }
    },{
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'RootComment',
    tableName: 'rootComments',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
}