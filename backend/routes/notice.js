const {RootPost, ListPost} = require('../../models');
const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/',async (req,res) =>{
    try{
        const posts = await RootPost.findAll({
            attributes:['id','title','content','order','tagF','tagS','tagT','order','category','file','createdAt','updatedAt','deletedAt'],
            raw: true,
        });

        const data = posts.map((post) => ({
            id:post.id,
            title:post.title,
            content: post.content,
            tagF: post.tagF,
            tagS: post.tagS,
            tagT: post.tagT,
            order:post.order,
            category: post.category,
            file: post.file,
        }));

        console.log({ main: data });
    }catch (error){
        console.error(error);
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const post = await RootPost.findOne({
            where:{id:req.params.id},
            attributes:['id','title','content','order','tagF','tagS','tagT','order','category','file','createdAt','updatedAt','deletedAt'],
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


module.exports = router;