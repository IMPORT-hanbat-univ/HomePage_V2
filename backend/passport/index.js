//const local =require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} =require('../models');
//

module.exports = (passport) => {
    passport.serializeUser((user, done) =>{
        //console.log(user);
        done(null, {id: user.id,accessToken:user.accessToken});
    });

    passport.deserializeUser((user,done) => {
        
        
    });


    //local(passport);
    kakao(passport);
}