const express = require('express');
const session =require('express-session')
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt =require("jsonwebtoken")
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');


const {Op} = require("sequelize");
const {config} = require("dotenv");


const router = express.Router();/*
router.post('/join', isNotLoggedIn ,async (req, res, next) => {
    const {email, nick_name, password} =req.body;
    try {
        const exUser = await User.findOne({where: {email}});
        if (exUser) {
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,
            nick_name,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local',(authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect('/');
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
});
*/
router.get('/logout', isLoggedIn, (req,res) => {
    req.logout();
    req.session.destroy();
    res.redirect('http://localhost:3000');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect: 'http://localhost:4000',
    failureMessage: true,
}),async (req, res) => {
    const kakao = Number(req.user.kakaoId);

    const loggedInUser= await User.findAll({
        raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
        attributes:['kakaoId','nick_name'],
        where:{
        kakaoId:{ [Op.eq]:kakao } ,
        }
    });

    const accessToken = jwt.sign({
        kakaoId: req.user.kakaoId,
        nick_name: loggedInUser[0].nick_name, //랭크,
    }, process.env.JWT_SECRET,{
        expiresIn: '1h', //기간 1시간
    });

    const refreshToken = jwt.sign({
        uuid:uuidv4(),
    },process.env.JWT_SECRET,{
            expiresIn: '14d', //기간 1시간
        }
    )

    console.log("token: " + accessToken);
    console.log("refresh: " + refreshToken);

    res.cookie('accessToken',accessToken);
    res.cookie('refreshToken',refreshToken);


    res.redirect('http://localhost:3000');

});
module.exports = router;
