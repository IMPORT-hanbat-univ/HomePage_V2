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
const ProjectComment =require('./projectComment');
const PatchNoteComment = require('./patchNoteComment');
const PatchNote = require('./patchNote');
const ListPostComment = require('./listPostComment');
const ListPost = require('./listPost');
const ClubUser = require('./clubUser');
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
db.ProjectComment = ProjectComment;
db.PatchNoteComment = PatchNoteComment;
db.PatchNote = PatchNote;
db.ListPostComment = ListPostComment;
db.ListPost = ListPost;
db.ClubUser = ClubUser;
db.CardPostComment = CardPostComment;
db.CardPost = CardPost;
db.ApplicationQuestion = ApplicationQuestion;
db.ApplicationAnswer = ApplicationAnswer;

User.init(sequelize);
UserProject.init(sequelize);
Schedule.init(sequelize);
RootPost.init(sequelize);
RootComment.init(sequelize);
Reservation.init(sequelize);
ProjectapplicationQuestion.init(sequelize);
ProjectapplicationAnswer.init(sequelize);
Project.init(sequelize);
ProjectComment.init(sequelize);
PatchNoteComment.init(sequelize);
PatchNote.init(sequelize);
ListPostComment.init(sequelize);
ListPost.init(sequelize);
ClubUser.init(sequelize);
CardPostComment.init(sequelize);
CardPost.init(sequelize);
ApplicationQuestion.init(sequelize);
ApplicationAnswer.init(sequelize);

User.associate(db);
UserProject.associate(db);
Schedule.associate(db);
RootPost.associate(db);
RootComment.associate(db);
Reservation.associate(db);
ProjectapplicationQuestion.associate(db);
ProjectapplicationAnswer.associate(db);
Project.associate(db);
ProjectComment.associate(db);
PatchNote.associate(db);
PatchNoteComment.associate(db);
ListPost.associate(db);
ListPostComment.associate(db);
ClubUser.associate(db);
CardPostComment.associate(db);
CardPost.associate(db);
ApplicationQuestion.associate(db);
ApplicationAnswer.associate(db);



module.exports = db;