//Routes for authenticating user

const express = require('express');
const { body } = require('express-validator');
const router = express.Router()
const User = require('../models/user')

const authController  =require('../controllers/auth')

router.put('/signup',[
    body('email').isEmail().withMessage('Please Enter an email')
   
    .custom((value,{req}) =>{
        //This is to check if the email already exists in the database, findone, if email matches value
        return User.findOne({email:value}).then(userDoc=>{
            if (userDoc) {
                return Promise.reject('E-mail address already exists');
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
], authController.signup);



router.post('/login',authController.login)
router.post('/getuserstatus',authController.getUserStatus)
module.exports =router