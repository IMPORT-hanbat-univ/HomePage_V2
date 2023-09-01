const express = require('express');
const passport = require('passport');
const jwt =require("jsonwebtoken")
const { verifyToken,authenticationToken,logout,isLoggedIn} = require('./middlewares');
const { RootPost, RootComment, User,ClubUser,ListPost,CardPost,ListPostComment,ProjectComment,PatchNoteComment,CardPostComment, Project,PatchNote} = require("../../models");
const { v4: uuidv4 } = require('uuid');
const {Op} = require("sequelize");
const {config} = require("dotenv");
const cors = require('cors');
const qs = require("qs");
const axios = require('axios');
const corsOptions = {
    origin: ['http://www.import-hanbat.com','http://localhost:3000','https://kauth.kakao.com','http://kauth.kakao.com'],
    credentials:true,
  };

const router = express.Router();
//const frontURL =  'http://localhost:3000';
const frontURL = 'http://www.import-hanbat.com'


router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    console.log("마이페이지")

    let user = await User.findOne({
        where: {
            id: userId
        },
        raw:true
    }).catch(error=> {
        console.error(`Error occurred while fetching User: ${error}`);
    })
    console.log(user)

    if(user.rank > 1){
        const clubUser = await ClubUser.findOne({
            where:{
                UserId:userId,
            },
            order:[['createdAt', 'DESC']],
            raw:true
        }).catch(error=> {
            console.error(`Error occurred while fetching ClubUser: ${error}`);
        })

        // Spread operator(...)을 사용하여 두 객체를 병합합니다.
        user = {...user, ...clubUser}
        
    }

    delete user.id; // id 프로퍼티 삭제
    user.userId = userId; // 새로운 userId 프로퍼티 추가

    res.json(user)
})

router.post('/profile/modify',async(req,res)=>{
    const body =req.body
    console.log("마이페이지")

    const updatedUser = await User.update({
        nick_name:body.nick_name,
        email:body.email,
        profileImg:body.profileImg
    },{
        where:{
            id:body.userId
        }
    }).catch(error=> {
        console.error(`Error occurred while fetching User: ${error}`);
    })

    if(body.department){
        const updatedClubUser = await ClubUser.update({
            department:body.department,
            grade:body.grade,
            blog:body.blog,
            github_url:body.github_url,
            framework:body.framework,
            language:body.language
        },{
            where:{
                UserId:body.userId
            }
        }).catch(error=> {
            console.error(`Error occurred while fetching ClubUser: ${error}`);
        })
    }
    let user = await User.findOne({
        where: {
            id: body.userId
        },
        raw:true
    }).catch(error=> {
        console.error(`Error occurred while fetching User: ${error}`);
    })
    console.log(user)

    if(user.rank > 1){
        const clubUser = await ClubUser.findOne({
            where:{
                UserId:body.userId,
            },
            order:[['createdAt', 'DESC']],
            raw:true
        }).catch(error=> {
            console.error(`Error occurred while fetching ClubUser: ${error}`);
        })

        // Spread operator(...)을 사용하여 두 객체를 병합합니다.
        user = {...user, ...clubUser}
        
    }

    delete user.id; // id 프로퍼티 삭제
    user.userId = body.userId; // 새로운 userId 프로퍼티 추가

    //쿠키 다시 발급
    const accessToken = jwt.sign({
        kakaoId: user.kakaoId,
        userId: user.id,
        nick_name: user.nick_name,
        rank: user.rank,
    }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1h', //기간 1시간
    });

    const refreshToken = jwt.sign({
            uuid:uuidv4(), //고유한 난수를 사용하고싶어서 uuid 사용
        },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '12h', //기간 12시간
        }
    );
    res.cookie('accessToken',accessToken,{maxAge:60*120*1000}); //쿠키 만료 180분
    res.cookie('refreshToken',refreshToken,{httpOnly:'http://www.import-hanbat.com',maxAge:60*60*12*1000}); //쿠키 만료 12시간


    res.json(user)

    
})

//탈퇴
router.post('/profile/withdrawal',verifyToken,async(req,res)=>{

    try{
        const access = await User.findOne({
            attributes:['accessToken'],
            where:{
                id:req.user.userId
            },
            raw:true
        })
        console.log(access)
        const accessToken = access.accessToken;
        let logout = await axios({
            method:'post',
            url:'https://kapi.kakao.com/v1/user/unlink',
            headers:{
              'Authorization': `Bearer ${accessToken}`
            }
          });
        
        res.cookie('accessToken','',{maxAge:0}); //쿠키 만료 10분
        res.cookie('refreshToken','',{maxAge:0});

        await User.destroy({
            where:{
                id:req.user.userId
            }
        }).catch(error=> {
            console.error(`Error occurred while destroy User: ${error}`);
        })

        await ClubUser.destroy({
            where:{
                id:req.user.userId
            }
        }).catch(error=> {
            console.error(`Error occurred while destroy ClubUser: ${error}`);
        })

        res.redirect(frontURL)
    }catch(error){
        console.log("탈퇴중 에러 userId: ",req.user.userId,error)
        res.sendStatus(403)

    }
    
})
const getdatas = async (table,userId) =>{
    
    const datas = await table.findAll({
        raw: true,
        include: 
        {
            model: User,
            attributes: ["nick_name"],
            raw: true,
        },
        where:{
            UserId:userId
        }
    }).catch(error=> {
        console.error(`Error occurred while fetching post: ${error}`);
    });

    
    datas.forEach((obj) => {
        obj.nick_name = obj["User.nick_name"];
        delete obj["User.nick_name"];
        obj.userId = obj["UserId"];
        delete obj["UserId"];
    });
    return datas;
}
const getcommnets = async (commnet,userId,post) =>{
    
    const datas = await commnet.findAll({
        raw: true,
        include: [
        {
            model: User,
            attributes: ["nick_name"],
            raw: true,
        },
        {
            model:post,
            attributes:['id','category'],
            raw:true
        }

    ],
        where:{
            UserId:userId
        }
    }).catch(error=> {
        console.error(`Error occurred while fetching comment: ${error}`);
    });
    let postId
    switch (post) {
        case RootPost:
            postId = "RootPost";
            break;
        case ListPost:
            postId = "ListPost";
            break;
        case CardPost:
            postId = "CardPost";       
            break;
        case Project:
            postId = "Project";      
            break;
        case PatchNote:
            postId = "PatchNote";
            break;
        default:
            throw new Error('테이블을 불러오지 못했습니다.');
    }
  

    
    datas.forEach((obj) => {
        obj.nick_name = obj["User.nick_name"];
        delete obj["User.nick_name"];
        obj.userId = obj["UserId"];
        delete obj["UserId"];

        obj.postId = obj[`${postId}.id`]
        delete obj[`${postId}.id`]
        obj.category = obj[`${postId}.category`]
        delete obj[`${postId}.category`]
    });
    return datas;
}


router.get('/myPost/:userId',async(req,res)=>{
    const userId = req.params.userId
    const card = await getdatas(CardPost,userId);
    const listPost = await getdatas(ListPost,userId);
    const patch = await getdatas(PatchNote,userId);
    const project = await getdatas(Project,userId);
    const root = await getdatas(RootPost,userId);
    let list = [].concat(card,listPost ,patch ,project ,root );
    console.log({list});
    res.json({list});

})

router.get('/myComment/:userId',async(req,res)=>{
    const userId = req.params.userId
    const card = await getcommnets(CardPostComment,userId,CardPost);
    const listPost = await getcommnets(ListPostComment,userId,ListPost);
    const patch = await getcommnets(PatchNoteComment,userId,PatchNote);
    const project = await getcommnets(ProjectComment,userId,Project);
    const root = await getcommnets(RootComment,userId,RootPost);
    let list = [].concat(card,listPost ,patch ,project ,root );

    console.log({list});
    res.json({list});

})




module.exports = router;

