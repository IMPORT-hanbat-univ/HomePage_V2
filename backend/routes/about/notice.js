const {RootPost, ListPost,User} = require('../../models');
const Sequelize = require('sequelize');
const {verifyToken} = require('../middlewares');
const express = require('express');
const router = express.Router();
const {v4:uuidv4} = require("uuid")
const {Op} = require("sequelize");

//목록
router.get('/', async function(req, res) {


    try{
        const posts = await RootPost.findAll({
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','deletedAt'],
            raw: true,
            include:[{
                model:User,
                attributes:['rank','nick_name'],
                raw: true,
            }]
        });
        posts.forEach(obj => {
            obj.rank = obj['User.rank'];
            obj.nick_name = obj['User.nick_name'];
            delete obj['User.rank'];
            delete obj['User.nick_name'];
        });

        console.log(posts);

        res.json({item: posts}); //배열 안에 내용이 없을때 {item: []} 로 보내짐


    }catch (error){
        console.error(error);
    }

});


//상세보기 데이터가 없을때는 빈 배열을 보낸다.
router.get('/:id',async (req,res)=>{
    try {

        const post = await RootPost.findAll({
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','deletedAt','UserId'],//닉네임추가,카카오 id
            where:{
                id:{ [Op.eq]:req.params.id}},
            raw: true,
            include:
            [{
                model:User,
                attributes:['nick_name','rank'],
            }]
        });
        const user = {
            nick_name: post[0]['User.nick_name'],
            rank: post[0]['User.rank']
        };

        delete post[0]['User.nick_name'];
        delete post[0]['User.rank'];

        const data = {...post[0],...user};
        console.log(data);

        if (!post) {
            return res.status(404).send('Post not found');
        }
        console.log({content:data});
        res.json({content:data});

    }catch (error){
        console.error(error);
    }
});

//create
router.post('/post',verifyToken,async (req, res)=>{

    const body = req.body
    const user = req.user
    console.log(req.user);

    try {
        const newPost= await RootPost.create({
            title: body.title,
            content: body.content,
            tagF: body.tagF,
            tagS: body.tagS,
            tagT: body.tagT,
            category: body.category,
            file: "",
            user_Id:user.userId,
            UserId:user.userId,


        })

        const nowPost = await RootPost.findAll({
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','UserId'],
            where:{
                id:{ [Op.eq]:newPost.id},

            },
            raw: true,

        })

        JSON.stringify(nowPost);
        console.log(nowPost);

        const data = {...nowPost[0],...{nick_name:user.nick_name},...{rank:user.rank}}
        JSON.stringify(data);
        console.log(data)

        return res.json({content:data});
    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})

//update
router.post('http://localhost:3000/about/notice/post/:id',verifyToken,async (req, res)=>{
    try {
        console.log(req.body);
        console.log(req);
        const body = req.body
        const user = req.user
        console.log(req.user);

        const updatePost= await RootPost.update({
            title: body.title,
            content: body.content,
            tagF: body.tagF,
            tagS: body.tagS,
            tagT: body.tagT,
            category: body.category,
            file: "",
            kakaoId: user.kakaoId,
            UserId:user.userId,

        },{
            where: {
                id:{ [Op.eq]:req.params.id}}
        })

        const updatedPost = await RootPost.findAll({
            attributes:['id','title','content','tagF','tagS','tagT','category','file','kakaoId','createdAt','updatedAt','UserId'],
            where:{
                id:{ [Op.eq]:updatePost.id},

            },
            raw: true,

        })

        JSON.stringify(updatedPost);
        console.log(updatedPost);

        const data = {...updatedPost[0],...{nick_name:user.nick_name},...{rank:user.rank}}
        JSON.stringify(data);
        console.log(data)

        return res.json({content:data});



    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})
router.post('/delete/:id',verifyToken,(req,res)=>{
    //삭제하기
})

module.exports = router;