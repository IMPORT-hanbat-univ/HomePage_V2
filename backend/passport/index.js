//const local =require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} =require('../models');
//

module.exports = (passport) => {
    passport.serializeUser((user, done) =>{
        //console.log(user);
        done(null, {id: user.id,accessToken:user.accessToken});
    });

    passport.deserializeUser(function(user, done) {
        //findById(id, function (err, user) {
        //console.log('deserialize');   
        done(null, user);
        //});
    });

    //local(passport);
    kakao(passport);
}