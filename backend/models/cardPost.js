const Sequelize = require('sequelize');

module.exports = class CardPost extends Sequelize.Model{
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
            category: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING(255),
                allowNull: true,
            }

    },{
    sequelize,
    timestamps: true, //시간
    modelName: 'CardPost',
    tableName: 'cardPosts',
    paranoid: true, //사용자가 삭제를 하면 소프트 삭제를 해줌, deleteAt에 timestamps값을 넣어주며 findAll사용시 검색에서 누락된다.
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
}