const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
	static init(sequelize){
		return super.init({
            email:{
                type: Sequelize.STRING(20),
                allowNull: true,
                unique: true,
            },
            nick_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            snsId:{ //kakao에서 넘어오는 아이디
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            /*password: { //내가 추가
                type: Sequelize.STRING(100),
                allowNull: false,
            },*/
            provider :{ //회원가입 방식 ex)'kakao'
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            /*rank: {
                type: Sequelize.STRING(20),
                allowNull: true,
            }*/

        },{
            sequelize,
			timestamps: true,
			underscored: false,
			modelName: 'User',
			tableName: 'users',
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.ListPost);
        db.User.hasMany(db.ListPostComment);
        db.User.hasMany(db.ApplicationAnswer);
        db.User.hasOne(db.ClubUser);
        db.User.hasMany(db.PatchNoteComment);
        db.User.hasMany(db.RootComment);
        db.User.hasMany(db.CardPostComment);
        db.User.hasMany(db.ProjectComment);

    }
}