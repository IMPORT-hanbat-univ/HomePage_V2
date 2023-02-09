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

User.init(sequelize);




module.exports = db;