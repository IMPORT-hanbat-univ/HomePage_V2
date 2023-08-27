
var createError = require('http-errors');
var sequelize = require('./models').sequelize;
var express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
var path = require('path');
var logger = require('morgan')
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
var app = express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const testRouter = require('./routes/test');

const authRouter = require('./routes/api/auth');
const postRouter = require('./routes/api/post');
const userManagementRouter = require('./routes/admin/userManagement')
const rankManagementRouter = require('./routes/admin/rankManagement');
const adminPostRouter = require('./routes/admin/post');

//const morganMiddleware = require('./routes/customMorgan');

sequelize.sync();
passportConfig(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("trust proxy", 1);
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(cors({
  origin: ['http://localhost:3000','https://kauth.kakao.com','http://kauth.kakao.com'],
  credentials:true,
  optionsSuccessStatus: 200,
}))


app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/api/auth', authRouter);
app.use('/api/post',postRouter);
//app.use('/test',testRouter);
=======
app.use('api/auth', authRouter);
app.use('/post',postRouter);
app.use('/test',testRouter);
>>>>>>> d6ec8191 (약간 수정)


app.use('/api/admin/userManagement',userManagementRouter);
app.use('/api/admin/rankManagement',rankManagementRouter);
app.use('/api/admin/post',adminPostRouter);
app.use('/api/image', express.static(path.join(__dirname, 'image')));

//app.use(morganMiddleware)
//app.use(morgan('dev'));
// 로그 기록
// if (process.env.NODE_ENV === 'production') { 
//   app.use(morgan('combined')); // 배포환경이면
// } else {
//   app.use(morgan('dev')); // 개발환경이면
// }


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;