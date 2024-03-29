const { RootPost, RootComment, User,ListPost,CardPost,ListPostComment,ProjectComment,PatchNoteComment,CardPostComment, Project,PatchNote} = require("../models");
const sequelize = require("sequelize");
const { upload,tokenValidationMiddleware, authenticationToken, verifyToken} = require("./middlewares");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
// Helper function to get table and tableComment based on category
//table 설정
const getTables = (category) => {
    let table, tableComment, relatedTableId;

    switch (category) {
        case 'notice':
            table = RootPost;
            tableComment = RootComment;
            relatedTableId = "RootPostId";
            break;
        case 'qna':
            table = ListPost;
            tableComment = ListPostComment;
            relatedTableId = "ListPostId";
            break;
        case 'information':
            table = CardPost;
            tableComment = CardPostComment;
            relatedTableId = "CardPostId";
            break;
        case 'project':
            table = Project;
            tableComment = ProjectComment;
            relatedTableId = "ProjectId";
            break;
        case 'patch':
            table = PatchNote;
            tableComment = PatchNoteComment;
            relatedTableId = "PatchNoteId";
            break;
        default:
            throw new Error('테이블을 불러오지 못했습니다.');
    }

    return { table, tableComment, relatedTableId };
};
//상세 보기
const getdata = async (table,column, dataId) =>{
    const data = await table.findAll({
        where: {
            [column]:dataId ,
        },
        raw: true,
        include: [ //조인
            {
                model: User,
                attributes: ["nick_name", "rank"],
            },
        ],
    });
    data.forEach((obj) => {
        obj.rank = obj["User.rank"];
        obj.nick_name = obj["User.nick_name"];
        obj.userId = obj["UserId"];
        delete obj["UserId"];
        delete obj["User.rank"];
        delete obj["User.nick_name"];
    });
    return data;

};
//목록
const getdatas = async (table,tableComment) =>{
    
    const datas = await table.findAll({
        raw: true,
        include: [
            {
                model: User,
                attributes: ["rank", "nick_name"],
                raw: true,
            },
        ],
    });
    //댓글 갯수 카운트
    const comments = await table.findAll({
        attributes:['id'],
        raw: true,
        include: [
            {
                model: tableComment,
                attributes: ['id'],
                required: false, // INNER JOIN 대신 LEFT JOIN으로 설정하여 모든 Post가 결과에 포함되도록 함
                },
        ],
        nest: true
    });

    console.log('이것은 목록 댓글개수확인을위한테스트야\n',comments);

    const countComments = [];
   

    comments.forEach((item) => {
        const id = item.id-1;
        console.log(item)
        if (item.tableComment+'s'.id=== null) {
            countComments[id]= countComments[id] ? countComments[id] : 0;
        } else {
            countComments[id] = countComments[id] ? countComments[id] + 1 : 1;
        }
    });
    console.log(countComments);

    
    datas.forEach((obj) => {
        
        obj.rank = obj["User.rank"];
        obj.nick_name = obj["User.nick_name"];
        obj.numberOfComments=countComments[obj.id - 1];
        delete obj["User.rank"];
        delete obj["User.nick_name"];
        obj.userId = obj["UserId"];
        delete obj["UserId"];
    });
    return datas;
}

const maxnumber = async (tableComment,relatedTableId,group,id)=>{
    const result = await tableComment.findOne({
        attributes: [[sequelize.fn("MAX", sequelize.cast(sequelize.col("sequence"), "INTEGER")), "max_sequence"]],
        where: {
            group: group,
            [relatedTableId]: id ,
        },
    });
    const maxSequence = result.get("max_sequence")|| -1;
    const sequence = Number(maxSequence)+1;

    return sequence;
}

function categoryParams(req,res){
    let category = req.query.category;
}

//목록
router.get("/", async function (req, res) {
    const body = req.body;
    const category = req.query.category
    
    try {
        const { table, tableComment, relatedTableId } = getTables(category);

        const posts = await getdatas(table,tableComment);

        console.log({ item: posts });
        res.json({ item: posts }); //배열 안에 내용이 없을때 {item: []} 로 보내짐
    } catch (error) {
        console.error(error);
    }
});

//create
router.post("/edit",verifyToken, async (req, res) => {
    const body = req.body;
    const user = req.user;

    let table, postId;

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
                    topic: body.topic,
                    category: body.category,
                    file: "",
                    UserId: user.userId,
                });
                table = ListPost;
                postId = qna.id;
                break
            case 'information':
                const information = await CardPost.create({
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
                postId = information.id;
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
                    leader:user.userId,
                    member:body.member,
                    UserId: user.userId,
                });
                table = Project;
                postId = project.id;
                break
            case 'patch':
                const patch = await PatchNote.create({
                    title: body.title,
                    content: body.content,
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
        const nowPost =await getdata(table,"id", postId);

        console.log({ content: nowPost[0] });
        return res.json({ content: nowPost[0] });

    }catch (err){
        console.error(err);
        return res.sendStatus(401);
    }
});

//상세조회
router.get("/:id",async (req, res) => {
    const body = req.body;
    const category = req.query.category;
    //body.category = "notice";
    try {
        const { table, tableComment, relatedTableId } = getTables(category);
        const post = await getdata(table,"id",req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        //댓글
        const comments = await getdata(tableComment,relatedTableId,req.params.id);

        console.log({ content: post[0],comment:comments });
        res.json({ content: post[0] ,comment:comments});
    } catch (error) {
        console.error(error);
    }
});

//업데이트
router.post("/edit/:id", verifyToken,async (req, res) => {
    const body = req.body;
    const user = req.user;
    let table, postId;
    
    // body.category = "notice";
    try {
        switch (body.category){
            case 'notice':
                const notice = await RootPost.update({
                        title: body.title,
                        content: body.content,
                        tagF: body.tagF,
                        tagS: body.tagS,
                        tagT: body.tagT,
                        category: body.category,
                        file: "",
                        UserId: user.userId,
                    },
                    {
                        where: {
                            id: { [Op.eq]: req.params.id },
                        },
                    });
                table = RootPost;
                postId = notice.id;
                break
            case 'qna':
                const qna = await ListPost.update({
                        title: body.title,
                        content: body.content,
                        topic:body.topic,
                        tagF: body.tagF,
                        tagS: body.tagS,
                        tagT: body.tagT,
                        category: body.category,
                        file: "",
                        UserId: user.userId,
                    },
                    {
                        where: {
                            id: { [Op.eq]: req.params.id },
                        },
                    });
                table = ListPost;
                postId = qna.id;
                break
            case 'information':
                const information = await CardPost.update({
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
                postId = information.id;
                break
            case 'project':

                const project = await Project.update({
                        title: body.title,
                        content: body.content,
                        tagF: body.tagF,
                        tagS: body.tagS,
                        tagT: body.tagT,
                        category: body.category,
                        file: "",
                        leader:user.userId,
                        member:body.member,
                        UserId: user.userId,
                    },
                    {
                        where: {
                            id: { [Op.eq]: req.params.id },
                        },
                    });
                table = Project;
                postId = project.id;
                break
            case 'patch':
                const patch = await PatchNote.update({
                        title: body.title,
                        content: body.content,
                        category: body.category,
                        file: "",
                        UserId: user.userId,
                    },
                    {
                        where: {
                            id: { [Op.eq]: req.params.id },
                        },
                    });
                table = PatchNote;
                postId = patch.id;
                break
            default:
                throw new Error('데이터를 수정하지 못했습니다.');
        }
        const updatedPost = await getdata(table, "id", req.params.id);

        console.log({ content: updatedPost[0] });
        return res.json({ content: updatedPost[0] });
    } catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }
});

//글 삭제
router.delete("/deleted/:id", async (req, res) => {
    const body = req.body;
    //const user = req.user;
    //body.category = "notice";
    const category = req.query.category;
    try{
        const { table, tableComment, relatedTableId } = getTables(body.category);
        await table.destroy({
            where: {
                id: { [Op.eq]: req.params.id },
            },
        });
        return res.sendStatus(200);
    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }
    //삭제하기
});

//댓글 작성
router.post("/comment/:id", verifyToken,async (req, res) => {

    const body = req.body;
    const user = req.user;
    //body.category = "notice";
    try {
        const { table, tableComment, relatedTableId } = getTables(body.category);

        const result = await tableComment.findOne({
            attributes: [[sequelize.fn("MAX", sequelize.cast(sequelize.col("sequence"), "INTEGER")), "max_sequence"]],
            where: {
                group: body.group,
                [relatedTableId]: req.params.id ,
            },
        });
        const maxSequence = result.get("max_sequence")|| -1;
        const sequence = Number(maxSequence)+1;

        console.log("가장 큰 숫자:", maxSequence);

        const newComment = await tableComment.create({
            content: body.content,
            group: body.group,
            sequence: sequence,
            UserId: user.userId,
            [relatedTableId]: req.params.id,
        });
        const nowComment= await getdata(tableComment,relatedTableId,newComment.id);

        console.log({ content: nowComment[0] });
        return res.json({ content: nowComment[0] });
    } catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }
});

//댓글 수정
router.post("/comment/:id/:commentId", verifyToken,async (req, res) => {

    const body = req.body;
    const user = req.user;
    //body.category = "notice";
    try {
        const { table, tableComment, relatedTableId } = getTables(body.category);

        await tableComment.update({
                content: body.content,
                UserId: user.userId,
                [relatedTableId]: req.params.id,
            },
            {
                where: {
                    id: { [Op.eq]: req.params.commentId },
                },
            });

        const nowComment= await getdata(tableComment,"id",req.params.commentId);
        console.log({ content: nowComment[0] });
        return res.json({ content: nowComment[0] });
    } catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }
});

//댓글 삭제
router.delete("/deleted/:id/:commentId",verifyToken, async (req, res) => {
    const body = req.body;
    const user = req.user;
    //body.category = "notice";
    try{
        const { table, tableComment, relatedTableId } = getTables(body.category);
        await tableComment.destroy({
            where: {
                id: { [Op.eq]: req.params.commentId },
            },
        });
        return res.sendStatus(200);
    }catch (error){
        console.error(error);
        return res.sendStatus(401);
    }

    //삭제하기
});

//file upload
router.post('/file',upload.single('fileupload'),function (req,res){

    console.log("post")
    console.log(req.file)
    console.log(req.file.path)
    console.log(upload)
    console.log(upload.storage.getFilename)
     // "public" 제거
    let transformedPath = req.file.path.replace("public", "");

    // 백슬래시("\")를 슬래시("/")로 변경
    transformedPath = transformedPath.replace(/\\/g, "/");
    transformedPath='/app/public'+transformedPath;
    console.log(transformedPath);
    return res.send(transformedPath);


})

module.exports = router;