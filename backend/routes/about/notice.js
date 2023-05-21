const {RootPost, ListPost} = require('../../models');
const Sequelize = require('sequelize');
const {verifyToken} = require('../middlewares');
const express = require('express');
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const {Op} = require("sequelize");

//목록
router.get('/', async function(req, res) {

    /*
       //테스트용 데이터 생성
      await RootPost.create({
        title: "title2",
        content: "content2",
        tagF: "tagF",
        tagS: "tagS",
        tagT: "tagT",
        category: "category2",
        kakaoId: "08773456768",

      })
    */



    try{
        const posts = await RootPost.findAll({
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','deletedAt','kakaoId'],
            raw: true,
        });

        const data = posts.map((post) => ({
            id:post.id,
            title:post.title,
            content: post.content,
            tagF: post.tagF,
            tagS: post.tagS,
            tagT: post.tagT,
            category: post.category,
            file: post.file,
            createdAt: post.createAt,
            updatedAt: post.updateAt,
            deletedAt: post.deldtedAt,
            userKakaoId: post.kakaoId,
        }));


        res.json({item: data}); //배열 안에 내용이 없을때 {item: []} 로 보내짐


    }catch (error){
        console.error(error);
    }

});


//상세보기 데이터가 없을때는 빈 배열을 보낸다.
router.get('/:id',async (req,res)=>{
    try {
        console.log('id:' + req.params.id);
        const post2 = await RootPost.findAll({
                attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','deletedAt'],
                where:{
                    id:{ [Op.eq]:req.params.id}}
            ,
            raw: true,
        });

        const post= JSON.stringify(post2);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        console.log("post"+ post);
        res.json(post);

    }catch (error){
        console.error(error);
    }
});

//create
router.post('/post',verifyToken,async (req, res)=>{
  
    console.log("req", req)
    const body = req.body
    const user = req.user
    try {
        await RootPost.create({

            title: body.title,
            content: body.content,

            tagF: body.tagF,
            tagS: body.tagS,
            tagT: body.tagT,
            category: body.category,
            file: "",
            kakaoId: user.kakaoId,

        })
        return res.sendStatus(200);

    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})

//update
router.post('http://localhost:3000/about/notice/post/:id',verifyToken,async (req, res)=>{
    try {

        await RootPost.update({
            id:req.id,
            title:req.title,
            content: req.content,
            tagF: req.tagF,
            tagS: req.tagS,
            tagT: req.tagT,
            category: req.category,
            file: req.file,
            kakaoId: req.kakaoId,

        },{
            where: {
                id:{ [Op.eq]:req.params.id}}
        })

    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})

module.exports = router;