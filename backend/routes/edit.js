const { RootPost, RootComment, User,ListPost, Project,PatchNote} = require("../models");
const sequelize = require("sequelize");
const { upload,tokenValidationMiddleware, authenticationToken, verifyToken} = require("./middlewares");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

//create
router.post("/",verifyToken, async (req, res) => {
    const body = req.body;
    const user = req.user;
    let table;
    let postId;

    /*
    1. 큰 카테고리(카테고리-테이블명 / notice-RootPost, QnA-ListPost, information(개발정보)-CardPost,project-Project, patch-PatchNote)
    2. switch case로 카테고리가 a 라면 db create, table이라는 변수에 테이블명 넣어주기
    3. 다시 nowPost에 지금 해당 데이터 담아서 리턴
    * */
    try {
        switch (body.category){
            case 'notice':
                const notice = await RootPost.create({
                    title: body.title,
                    content: body.content,
                    tagF: body.tagF,
                    tagS: body.tagS,
                    tagT: body.tagT,
                    category: body.category,
                    file: "",
                    UserId: user.userId,
                });
                table = RootPost;
                postId = notice.id;
                break
            case 'qna':
                const qna = await ListPost.create({
                    title: body.title,
                    content: body.content,
                    tagF: body.tagF,
                    tagS: body.tagS,
                    tagT: body.tagT,
                    category: body.category,
                    file: "",
                    UserId: user.userId,
                });
                table = ListPost;
                postId = qna.id;
                break
            case 'project':

                const project = await Project.create({
                    title: body.title,
                    content: body.content,
                    tagF: body.tagF,
                    tagS: body.tagS,
                    tagT: body.tagT,
                    category: body.category,
                    file: "",
                    UserId: user.userId,
                });
                table = Project;
                postId = project.id;
                break
            case 'patch':
                const patch = await PatchNote.create({
                    title: body.title,
                    content: body.content,
                    tagF: body.tagF,
                    tagS: body.tagS,
                    tagT: body.tagT,
                    category: body.category,
                    file: "",
                    UserId: user.userId,
                });
                table = PatchNote;
                postId = patch.id;
                break
            default:
                throw new Error('데이터를 저장하지 못했습니다.');
        }
        const nowPost = await table.findAll({
            where: {
                id: { [Op.eq]: postId },
            },
            raw: true,
            include: [//조인
                {
                    model: User, //만약에 rootPost가 root랑 연결되면 여기부분 바꿔야함
                    attributes: ["nick_name", "rank"],
                },
            ],
        });
        nowPost.forEach((obj) => {
            obj.rank = obj["User.rank"];
            obj.nick_name = obj["User.nick_name"];
            delete obj["User.rank"];
            delete obj["User.nick_name"];
        });
        console.log({ content: nowPost[0] });
        return res.json({ content: nowPost[0] });

    }catch (err){
        console.error(error);
        return res.sendStatus(401);
    }


});