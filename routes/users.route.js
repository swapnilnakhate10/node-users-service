let express = require('express');
let router = express.Router();
let log4js = require("log4js");
const config = require('config');
let jwt = require('express-jwt');
const fs = require("fs");
const path = require("path");
const multer  = require('multer');
const logger = log4js.getLogger("Users Routes");
let usersInterceptor = require('../interceptors/users.interceptor');
let usersController = require('../controllers/users.controller');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

logger.debug("Users Routes Initiated");

let secrete_key = config.get('token.secret');
let audience_key = config.get('token.audience');
let issuer_key = config.get('token.issuer');

let jwtCheck = jwt({
    secret: secrete_key,
    audience: audience_key,
    issuer: issuer_key,
    algorithms: [ 'HS256' ]
});

router.post('/login', usersInterceptor.loginUser, usersController.loginUser);

router.post('/', usersInterceptor.createUser, usersController.createUser);

router.put('/:userId', usersController.updateUser);

router.post('/profile', upload.single('profilePicture'), function (req, res, next) {
    console.log("Req file : ",req.file);
    res.send({ message : "File uploaded successfully.", imagePath : req.file.path });
})

router.get('/list', jwtCheck, usersController.listUsers);

module.exports = router;
