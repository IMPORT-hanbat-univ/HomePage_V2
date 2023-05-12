const {RootPost, ListPost} = require('../../models');
const Sequelize = require('sequelize');
const {verifyToken} = require('../middlewares');
const express = require('express');
const router = express.Router();


//목록
router.get('/', async function(req, res, next) {

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
router.get('http://localhost:3000/about/notice/:id',async (req,res)=>{
    try {
        const post = await RootPost.findOne({
            where:{id:req.params.id},
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','deletedAt'],
            raw: true,
        });

        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.json(post);

    }catch (error){
        console.error(error);
    }
});

//create
router.post('http://localhost:3000/about/notice/post',verifyToken,async (req, res)=>{
    try {
        await RootPost.create({
            id:req.id,
            title:req.title,
            content: req.content,
            tagF: req.tagF,
            tagS: req.tagS,
            tagT: req.tagT,
            category: req.category,
            file: req.file,
            kakaoId: req.userKakaoId,

        })

    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})

//update
router.post('http://localhost:3000/about/notice/post/:id',verifyToken,async (req, res)=>{
    try {
        const post = await RootPost.findOne({
            where:{id:req.params.id},
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','deletedAt'],
            raw: true,
        });
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
            where: {id: req.params.id},
        })

    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})

module.exports = router;