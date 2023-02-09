const Sequelize = require('sequelize');

module.exports = class UserProject extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            rank:{
                type: Sequelize.STRING(30),
                allowNull: false,
            },
        }
    },{
    sequelize,
    timestamps: true, //시간
    modelName: 'UserProject',
    tableName: 'userProjects',
    paranoid: true, //사용자가 삭제를 하면 소프트 삭제를 해줌, deleteAt에 timestamps값을 넣어주며 findAll사용시 검색에서 누락된다.
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
}
}