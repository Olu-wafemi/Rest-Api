const expect = require('chai').expect
const sinon= require('sinon')


const User= require('../models/user')


const Authcontroller = require('../controllers/auth')

describe('Auth-controller-Login', function(){
    sinon.stub(User, 'findone')
    User.findOne.throws()
    
})