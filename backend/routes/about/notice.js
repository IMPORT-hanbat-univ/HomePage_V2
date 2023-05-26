const {RootPost,RootComment,User} = require('../../models');
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
router.post('/post/:postId',verifyToken,async (req, res)=>{
    try {

        const body = req.body
        console.log(body)
        const user = req.user
        console.log(req.user);

        await RootPost.update({
            title: body.title,
            content: body.content,
            tagF: body.tagF,
            tagS: body.tagS,
            tagT: body.tagT,
            category: body.category,
            file: "",
            UserId:user.userId,

        },{
            where: {
                id:{ [Op.eq]:req.params.postId}}
        })

        const updatedPost = await RootPost.findAll({
            attributes:['id','title','content','tagF','tagS','tagT','category','file','createdAt','updatedAt','UserId'],
            where:{
                id:{ [Op.eq]:req.params.id},

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
router.post('/comment/:id',verifyToken,async (req,res)=>{
    //댓글 작성

    const body = req.body
    const user = req.user
    console.log(req.user);

    try {
        RootComment.findOne({
            attributes: [
                [sequelize.fn('MAX', sequelize.cast(sequelize.col('sequence'), 'UNSIGNED')), 'max_sequence']
            ]
        }).then(result => {
            const maxSequence = result.get('max_sequence') || 0;
            console.log('가장 큰 숫자:', maxSequence);
        }).catch(error => {
            console.error('오류 발생:', error);
        });

        const newcomment= await RootComment.create({

            content: body.content,
            group:body.group,
            sequence: maxSequence+1,
            UserId:user.userId,
            RootPostId:body.id,


        })

        const nowcomment = await RootComment.findAll({
            attributes:['content','sequence','group','createdAt','UserId'],
            where:{
                id:{ [Op.eq]:newcomment.id},

            },
            raw: true,

        })

        JSON.stringify(nowcomment);
        console.log(nowcomment);

        const data = {...nowcomment[0],...{nick_name:user.nick_name},...{rank:user.rank}}
        JSON.stringify(data);
        console.log(data)

        return res.json({content:data});
    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

})
router.delete('/post/:postId',verifyToken,async (req,res)=>{
    await RootPost.destroy({
        where:{
            id:{[Op.eq]:req.params.postId}
        }
    });
    //삭제하기
})

module.exports = router;