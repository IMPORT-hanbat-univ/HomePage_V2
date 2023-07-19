const express = require('express');
const passport = require('passport');
const jwt =require("jsonwebtoken")
const { verifyToken,authenticationToken,logout,isLoggedIn} = require('./middlewares');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const {Op} = require("sequelize");
const {config} = require("dotenv");
const cors = require('cors');
const axios = require('axios');
const corsOptions = {
    origin: 'http://localhost:4000',
  };

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
// router.get('/logout', authenticationToken, (req,res) => {
//     try{
    
//         req.logout(function(err) {
//             if (err) { 
//                 console.log(err);
//                 return res.sendStatus(401)
//              }
            
//             req.session.destroy();
//              return res.sendStatus(200)
//           });
       
//         //refresh, access 삭제
       
//     }catch(err){
//         console.log(err);
    
//     }
   
// });
router.get('/logout',async(req,res)=>{
    // https://kapi.kakao/com/v1/user/logout
    const accessToken = req.headers['accesstoken'];
    const refreshToken = req.headers['refreshtoken'];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  try {
    //console.log(req.user)
    
    
    const ACCESS = await User.findOne({
        attributes:['accessToken'],
        raw:true,
        where:{
            id:req.user.userId
        }
    });
    const ACCESS_TOKEN = ACCESS.accessToken;
    console.log("accessToken: ",ACCESS_TOKEN);
    let logout = await axios({
      method:'post',
      url:'https://kapi.kakao.com/v1/user/unlink',
      headers:{
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    res.cookie('accessToken','',{maxAge:0}); //쿠키 만료 10분
    res.cookie('refreshToken','',{maxAge:0});
  } catch (error) {
    console.error(error);
    res.json(error);
  }
  // 세션 정리
  //req.logout();
  
  req.session.destroy();

  
  
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect: 'http://localhost:4000',
    failureMessage: true,
}),async (req, res) => {
    const kakao = Number(req.user.kakaoId);

    const loggedInUser= await User.findAll({
        raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
        attributes:['kakaoId','nick_name','rank','id'],
        where:{
            kakaoId:{ [Op.eq]:kakao } ,
        }
    });

    const accessToken = jwt.sign({
        kakaoId: req.user.kakaoId,
        userId: loggedInUser[0].id,
        nick_name: loggedInUser[0].nick_name,
        rank: loggedInUser[0].rank,
    }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '10m', //기간 10분
    });

    const refreshToken = jwt.sign({
            uuid:uuidv4(), //고유한 난수를 사용하고싶어서 uuid 사용
        },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '12h', //기간 12시간
        }
    );



    console.log("token: " + accessToken);
    console.log("refresh: " + refreshToken);

    res.cookie('accessToken',accessToken,{maxAge:60*10*1000}); //쿠키 만료 10분
    res.cookie('refreshToken',refreshToken,{maxAge:60*60*12*1000}); //쿠키 만료 12시간

    try {
        await User.update(
            { refreshToken: refreshToken },
            { where:{
                    id:{ [Op.eq]:loggedInUser[0].id } ,
                } }
        );
    } catch (error) {
        console.error("Error occurred while updating refreshToken:", error);
        res.sendStatus(500);
        return;
    }


    res.redirect('http://localhost:3000');

});

router.get("/tokenverification",verifyToken, async (req, res) => {
    //userid 추가하기
    console.log("123123");
    const accessToken = req.headers["accesstoken"] || req.cookies.accessToken;
    const refreshToken = req.headers["refreshtoken"] || req.cookies.refreshToken;
    console.log("accessToken", accessToken);
    console.log("refreshtoken", refreshToken);
    if (!accessToken ) {
        if (refreshToken) { // Access token이 없는 경우 Refresh token 검증
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = User.findAll({
                    raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                    attributes:['id','nick_name','rank','kakaoId'],
                    where:{
                        refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                    }
                });
                const newAccessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                const refresh = "updated";
                const newRefreshToken = jwt.sign({refresh}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '12h' });
                try {
                    await User.update(
                        { refreshToken: refresh },
                        { where:{
                                refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                            } }
                    );

                } catch (error) {
                    console.error("Error occurred while updating refreshToken:", error);
                    res.sendStatus(500);
                    return;
                }
                console.log("accessToken None, refreshToken success");
                res.cookie('accessToken', newAccessToken, { httpOnly: 'http://localhost:3000/',maxAge:60*10*1000 });
                res.cookie('refreshToken', newRefreshToken, { httpOnly: 'http://localhost:3000/' ,maxAge:60*60*12*1000});

                return next();
            } catch (err) {
                console.error(err);
                return res.sendStatus(403);
            }
        } else { // Access token, Refresh token 모두 없는 경우
            return res.sendStatus(404);
        }
    }
    res.setHeader("accesstoken", accessToken);
    res.setHeader("refreshtoken", refreshToken);
    return res.sendStatus(200); // Success
});
module.exports = router;

