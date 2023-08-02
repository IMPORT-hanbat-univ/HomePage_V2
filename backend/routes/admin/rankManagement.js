const { RootPost, RootComment, User,ListPost,CardPost,ListPostComment,ProjectComment,PatchNoteComment,CardPostComment, Project,PatchNote, ClubUser} = require("../../models");
const express = require('express');
const passport = require('passport');
const jwt =require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const {Op} = require("sequelize");
const {config} = require("dotenv");
const cors = require('cors');
const axios = require('axios');
const corsOptions = {
    origin: 'http://localhost:4000',
  };

const router = express.Router();
//요청레벨이 있는사람 띄워주기
router.get('/',async(req,res)=>{
    const users =  await User.findAll({
        raw:true,
        attributes:['id','email','nick_name','rank','requestRank','createdAT'],
        where:{
            requestRank:{
                [Op.ne]: null
            }
        }
    })
    console.log(users);
    return res.json(users);
})

//레벨 바꾸기
router.post('/changeRank',async(req,res)=>{
    console.log(req.body.changeRanks);
    try{
        
        for(const item of req.body.changeRanks){
            const {userId,changeRank}=item;
            const user = await User.findOne({
                raw: true,
                where:{
                    id:userId
                }
            })
            if(user.requestRank===changeRank||null){
                const newUser = await User.update({
                    rank: changeRank,
                    requestRank: null,
                },{
                    where:{
                        id:userId
                    }
                })
    
                const nowUser = await User.findOne({
                    raw: true,
                    where:{
                        id:userId
                    }
                })
                console.log('결과: ',nowUser);
            }else{
                console.log('requestRank 와 changeRank 다르다')
                throw error;
            }
            
        }
    }catch(error){
        console.error('Error updating userRank:', error);
        throw error;
    }
})







module.exports = router;