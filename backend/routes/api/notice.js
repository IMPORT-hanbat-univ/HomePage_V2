const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } =require('../middlewares');
const {router} = require("express/lib/application");

router.post('/')