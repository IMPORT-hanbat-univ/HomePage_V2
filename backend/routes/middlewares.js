const {User} = require("../models");
const {Op} = require("sequelize");
const jwt = require("jsonwebtoken")
const {v4:uuidv4} = require("uuid")
const multer = require('multer');
const frontURL = 'http://localhost:3000/'


exports.logout = (req, res) => {
    console.log("미들웨어 로그아웃 위치함")
    req.logout(() => {
        console.log("리다이랙트 슬래쉬")
        res.redirect('/');
    });
};

/*토큰 유효성 검증
1. accessToken 존재 => decode => 유효하면 넘어가고 만료라면 refreshToken검증 => refreshToken 유효시 토큰 두개다 다시 발급해서 전달, 유효하지 않다면 에러
2. accessToken 미존재 => refreshToken 검증 => 유효하면 토큰 두개다 다시 발급, 유효하지않다면 에러
*/
//post 요청시 얘사용
exports.verifyToken = async (req, res, next) => {

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    // Access token이 있는 경우 검증

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            console.log("accessToken success");
            req.user = decoded;
            return next();
            
        } catch (err) {
            // Access token이 만료된 경우, Refresh token 검증
            if (err.name === 'TokenExpiredError') {
                //
                if(refreshToken){
                    try {
                        const decodeRefreshToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
                        console.log("accessToken Expired, refreshToken success");

                        const user = await User.findAll({
                            raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                            attributes:['id','nick_name','rank','kakaoId','refreshToken'],
                            where:{
                                 refreshToken:{ [Op.eq]:decodeRefreshToken.refreshToken } ,
                            }
                        })
                        user.userId = user.id;
                        delete user.id;

                        const newAccessToken = jwt.sign({
                            kakaoId:user.kakaoId,
                            nick_name:user.nick_name,
                            userId:user.userId,
                            rank:user.rank
                        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                        const refresh = uuidv4();
                        const newRefreshToken = jwt.sign({refresh}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '12h' });

                        try {
                            await User.update(
                                { refreshToken: refresh },
                                { where:{
                                        refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                                    } }
                            );
                            console.log("accessToken failure, refreshToken success");
                        } catch (error) {
                            console.error("Error occurred while updating refreshToken:", error);
                            res.sendStatus(500);
                            return;
                        }
                        res.cookie('accessToken', newAccessToken, {maxAge:60*90*1000}); // 쿠키는 1시간 반
                        res.cookie('refreshToken', newRefreshToken, {httpOnly: frontURL,maxAge:60*60*12*1000});
                        
    
                        req.user = user;
                        return next();


                        
                    } catch (error) {
                        if (err.name === 'TokenExpiredError') {
                            res.sendStatus(403).send('refreshToken Expired')
                            console.log('refreshToken Expired')

                        }
                        
                    }

                }
                
            } else {
                console.error(err);
                return res.sendStatus(402); 
            }
        }
    } else if (refreshToken) { // Access token이 없는 경우 Refresh token 검증
        try {
            
            
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findOne({
                raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                attributes:['id','nick_name','rank','kakaoId'],
                where:{
                    refreshToken:{ [Op.eq]:decoded.refreshId} ,
                }
            });
            //여기에 id를 userId 로 전환
            user.userId = user.id;
            delete user.id;
            
            const newAccessToken = jwt.sign({
                kakaoId:user.kakaoId,
                nick_name:user.nick_name,
                userId:user.userId,
                rank:user.rank
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            const refresh = uuidv4();
            const newRefreshToken = jwt.sign({refresh}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '12h' });
            try {
                await User.update(
                    { refreshToken: refresh },
                    { where:{
                            refreshToken:{ [Op.eq]:decoded.refreshId } ,
                        } }
                );

            } catch (error) {
                console.error("Error occurred while updating refreshToken:", error);
                res.sendStatus(500);
                return;
            }
            
            req.user = user;
            //console.log('리퀘스트.유저임!!!',req.user)
            res.cookie('accessToken', newAccessToken, { httpOnly: 'http://localhost:3000/',maxAge:60*10*1000 });
            res.cookie('refreshToken', newRefreshToken, { httpOnly: 'http://localhost:3000/' ,maxAge:60*60*12*1000});
            res.cookie('newToken2', "new", { httpOnly: 'http://localhost:3000/' ,maxAge:60*60*12*1000});

            console.log("accessToken None, refreshToken success");
            return next();
        } catch (err) {
            console.error(err);
            return res.sendStatus(403);
        }
    } else { // Access token, Refresh token 모두 없는 경우
        return res.sendStatus(404);
    }
};

//admin 확인
exports.rankAdmin = (req,res,next) => {
     //req.user 로 넘어온 랭크 확인 후 어드민 일때만 next
     if(req.rank == 5){
        next();
     }else{
        res.sendStatus(402).send('Rank is not admin')
        
     }
}


var imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 서버에 저장될 위치
    cb(null, "./public/image");
  },
  filename: (req, file, cb) => {
        var mimeType;

        switch (file.mimetype) {
            case "image/jpeg":
                mimeType = "jpg";
                break;
            case "image/jpg":
                mimeType = "jpg";
                break;
            default:
                mimeType = "png";
                break;
        }

    // 서버에 저장될 때 파일 이름
    cb(null, Date.now() + "-" + uuidv4()+"."+mimeType);
    // console.log("file.origianlname"+ file.originalname);
  },
});
exports.upload = multer({ storage: storage, fileFilter: imageFilter })


//랭크 확인 미들웨어

//db 관련 함수