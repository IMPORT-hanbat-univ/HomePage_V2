const {RootPost, ListPost} = require('../models');
const Sequelize = require('sequelize');
const {verifyToken} = require('./middlewares');
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
res.render('index')
});

module.exports = router;


