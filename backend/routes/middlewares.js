const {User} = require("../models");
const {Op} = require("sequelize");
exports.isLoggedIn =  (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};
/*토큰 유효성 검증
1. accessToken 존재 => decode => 유효하면 넘어가고 만료라면 refreshToken검증 => refreshToken 유효시 토큰 두개다 다시 발급해서 전달, 유효하지 않다면 에러
2. accessToken 미존재 => refreshToken 검증 => 유효하면 토큰 두개다 다시 발급, 유효하지않다면 에러
*/
exports.verifyToken = async (req, res, next) => {
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;

    // Access token이 있는 경우 검증
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            // Access token이 만료된 경우, Refresh token 검증
            if (err.name === 'TokenExpiredError' && refreshToken) {
                try {
                    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                    user = await User.findAll({
                        raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                        attributes:['kakaoId','nick_name','rank'],
                        where:{
                             refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                        }
                    })

                    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    const newRefreshToken = uuidv4();
                    try {
                        await User.update(
                            { refreshToken: newRefreshToken },
                            { where:{
                                    refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                                } }
                        );
                    } catch (error) {
                        console.error("Error occurred while updating refreshToken:", error);
                        res.sendStatus(500);
                        return;
                    }
                    res.cookie('accessToken', newAccessToken, { httpOnly: 'http://localhost:3000/' });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: 'http://localhost:3000/' });

                    req.user = user;
                    return next();
                } catch (err) {
                    console.error(err);
                    return res.sendStatus(401);
                }
            } else {
                console.error(err);
                return res.sendStatus(401);
            }
        }
    } else if (refreshToken) { // Access token이 없는 경우 Refresh token 검증
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = User.findAll({
                raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                attributes:['kakaoId','nick_name','rank'],
                where:{
                    refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                }
            });
            const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const newRefreshToken = uuidv4();
            try {
                await User.update(
                    { refreshToken: newRefreshToken },
                    { where:{
                            refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                        } }
                );
            } catch (error) {
                console.error("Error occurred while updating refreshToken:", error);
                res.sendStatus(500);
                return;
            }
            res.cookie('accessToken', newAccessToken, { httpOnly: 'http://localhost:3000/' });
            res.cookie('refreshToken', newRefreshToken, { httpOnly: 'http://localhost:3000/' });

            return next();
        } catch (err) {
            console.error(err);
            return res.sendStatus(401);
        }
    } else { // Access token, Refresh token 모두 없는 경우
        return res.sendStatus(401);
    }
};
// 토큰이 새롭게 발급되는 부분이 제거된 미들웨어
exports.authenticationToken = async (req, res, next) => {
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;

    // Access token이 있는 경우 검증
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            // Access token이 만료된 경우, Refresh token 검증
            if (err.name === 'TokenExpiredError' && refreshToken) {
                try {
                    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                    user = await User.findAll({
                        raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                        attributes:['kakaoId','nick_name','rank'],
                        where:{
                            refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                        }
                    })

                    req.user = user;
                    return next();
                } catch (err) {
                    console.error(err);
                    return res.sendStatus(401);
                }
            } else {
                console.error(err);
                return res.sendStatus(401);
            }
        }
    } else if (refreshToken) { // Access token이 없는 경우 Refresh token 검증
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = User.findAll({
                raw:true, //쓸데없는 데이터 말고 dataValues 안의 내용만 나옴(궁금하면 옵션빼고 아래 us 사용하는 데이터 주석처리하고 확인)
                attributes:['kakaoId','nick_name','rank'],
                where:{
                    refreshToken:{ [Op.eq]:decoded.refreshToken } ,
                }
            });

            return next();
        } catch (err) {
            console.error(err);
            return res.sendStatus(401);
        }
    } else { // Access token, Refresh token 모두 없는 경우
        return res.sendStatus(401);
    }
};