const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const UserProject = require('./userProject');
const Schedule = require('./schedule');
const RootPost = require('./rootPost');
const RootComment = require('./rootComment');
const Reservation = require('./reservation');
const ProjectapplicationQuestion = require('./projectapplicationQuestion');
const ProjectapplicationAnswer = require('./projectapplicationAnswer');
const Project = require('./project');
const PatchNoteComment = require('./patchNoteComment');
const PatchNote = require('./patchNote');
const ListPostComment = require('./listPostComment');
const ListPost = require('./listPost');
const ClubUser = require('./cludUser');
const CardPostComment = require('./cardPostComment');
const CardPost = require('./cardPost');
const ApplicationQuestion = require('./applicationQuestion');
const ApplicationAnswer = require('./applicationAnswer');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.UserProject = UserProject;
db.Schedule = Schedule;
db.RootPost = RootPost;
db.RootComment = RootComment;
db.Reservation = Reservation;
db.ProjectapplicationQuestion = ProjectapplicationQuestion;
db.ProjectapplicationAnswer = ProjectapplicationAnswer;
db.Project = Project;
db.PatchNoteComment = PatchNoteComment;
db.PatchNote = PatchNote;
db.ListPostComment = ListPostComment;
db.ListPost = ListPost;
db.ClubUser = ClubUser;
db.CardPostComment = CardPostComment;
db.CardPost = CardPost;
db.ApplicationQuestion = ApplicationQuestion;
db.ApplicationAnswer = ApplicationAnswer;

// console.log("1");
// db.User.hasMany(db.ListPost);
// console.log("2");
// db.ListPost.belongsTo(db.User);

// db.User.hasMany(db.ListPostComment);
// db.ListPostComment.belongsTo(db.User);

// db.User.hasMany(db.ApplicationAnswer);
// db.ApplicationAnswer.belongsTo(db.User);

// db.User.hasOne(ClubUser);
// db.ClubUser.belongsTo(db.User);

// db.ListPost.hasMany(db.ListPostComment);
// db.ListPostComment.belongsTo(db.ListPost);

// db.ApplicationQuestion.hasMany(db.ApplicationAnswer);
// db.ApplicationAnswer.belongsTo(db.ApplicationQuestion);

// db.ClubUser.hasMany(db.CardPost);
// db.CardPost.belongsTo(db.ClubUser);

// db.ClubUser.hasMany(db.CardPostComment);
// db.CardPostComment.belongsTo(db.ClubUser);

// db.CardPost.hasMany(db.CardPostComment);
// db.CardPostComment.belongsTo(db.CardPost);

// db.ClubUser.hasMany(db.RootPost);
// db.RootPost.belongsTo(db.ClubUser);

// db.ClubUser.hasMany(db.RootComment);
// db.RootComment.belongsTo(db.ClubUser);

// db.RootPost.hasMany(db.RootComment);
// db.RootComment.belongsTo(db.RootPost);
// //유저프로젝트모델
// db.ClubUser.hasMany(db.UserProject);
// db.UserProject.belongsTo(db.ClubUser);

// db.Project.hasMany(db.UserProject);
// db.UserProject.belongsTo(db.Project);

// db.Project.hasMany(db.PatchNote);
// db.PatchNote.belongsTo(db.Project);

// db.PatchNote.hasMany(db.PatchNoteComment);
// db.PatchNoteComment.belongsTo(db.PatchNote);

// db.ClubUser.hasMany(db.PatchNoteComment);
// db.RootComment.belongsTo(db.PatchNoteComment);

// db.Project.hasMany(db.ProjectapplicationQuestion);
// db.ProjectapplicationQuestion.belongsTo(db.Project);

// db.ProjectapplicationQuestion.hasMany(db.ProjectapplicationAnswer);
// db.ProjectapplicationAnswer.belongsTo(db.ProjectapplicationQuestion);

// db.ClubUser.hasMany(db.ProjectapplicationAnswer);
// db.ProjectapplicationAnswer.belongsTo(db.ClubUser);

// db.ClubUser.hasMany(db.Reservation);
// db.Reservation.belongsTo(db.ClubUser);


User.init(sequelize);
UserProject.init(sequelize);
Schedule.init(sequelize);
RootPost.init(sequelize);
RootComment.init(sequelize);
Reservation.init(sequelize);
ProjectapplicationQuestion.init(sequelize);
ProjectapplicationAnswer.init(sequelize);
Project.init(sequelize);
PatchNoteComment.init(sequelize);
PatchNote.init(sequelize);
ListPostComment.init(sequelize);
ListPost.init(sequelize);
ClubUser.init(sequelize);
CardPostComment.init(sequelize);
CardPost.init(sequelize);
ApplicationQuestion.init(sequelize);
ApplicationAnswer.init(sequelize);





module.exports = db;