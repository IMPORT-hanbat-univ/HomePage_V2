const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt =require("jsonwebtoken")
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const IMPORTURL = 'http://localhost:3000';

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
    res.redirect(IMPORTURL);
});

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect: IMPORTURL,
    }),(req,res)=> {
    const token = jwt.sign({
        id:User.id,
        nick_name:User.nick_name,
    }, process.env.JWT_SECRET,{
        expiresIn: '3h',
    },(error,token)=> {
        if(error){
            console.log(error);
        }
        router.get('https://4a81ae53-a497-4ee2-8ead-78f4e246e6c6.mock.pstmn.io/token',(req,res) => {
            token= token;
            console.log('post: '+ token);
            }
        );
        console.log('token: ' + token);
    })

    res.redirect(IMPORTURL);
});
module.exports = router;
