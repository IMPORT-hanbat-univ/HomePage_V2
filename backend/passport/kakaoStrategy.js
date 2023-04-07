const KakaoStrategy = require('passport-kakao').Strategy;

const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL:'/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done)=> {
        try {
            const exUser = await User.findOne({  //가입이력 확인
                where: {
                    snsId: profile.id,
                    provider: 'kakao'
                }});
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({ //새 유저 생성
                    email: profile._json?.kakao_account.email,//nullish라 판단하면 에러가아닌 undefined 출력
                    nick_name: profile.displayName,
                    snsId: profile.id,
                    // rank:"common", 랭크는 동아리 가입시 생성해주는 것이다.
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        }catch (error) {
            console.error(error);
            done(error);
        }
    }));

};