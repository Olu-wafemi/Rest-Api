const expect = require('chai').expect
const sinon= require('sinon')
//Sinon is for stubbing

const mongoose =  require('mongoose')


const User= require('../models/user')


const Authcontroller = require('../controllers/auth')
//Test the login fucntion, if the User is found or if the database failed or if the user is not found.\
describe('Auth-controller', function(){

    before(function(done){
        mongoose.connect(
            'mongodb+srv://EffEmm:Oluwafem4@cluster0.mjz0a.mongodb.net/mynewbase?retryWrites=true&w=majority'
          
        ).then(result=>{
             const user = new User({
                 email:'test@testinggg.com',
                 password: 'tesla',
                 name: 'Test',
                 posts: [],
                 _id:'61ec09913d2dc8cad2ff3094'

             })
             return user.save()
        }).then(()=>{

            done();
        })

    })
    //Stubbing  the FindOne method
    //The it block is used for an actual testcase
    //Done is to used to make mocha run the test asynchronously, basically tells mocah to wait
    it('should throw an error with code 500 if accessing the daatabase fails', function(done){
        sinon.stub(User, 'findOne')
        User.findOne.throws();
        const req = {
            body:{
                email: 'effemm@gmail.com',
                password:"testing1234"
            }
        };
    Authcontroller.login(req,{},()=>{}).then(result=>{
        expect(result).to.be.an('error')

        expect(result).to.have.property('statuscode',500)
        done(); 
    })
        User.findOne.restore();
    })

    it('should send a response for a valid user status for an existing user', function(done){
        //This is a dedicated test database, a test datbase should be used when testing
       
              const req = {userid: '61ec09913d2dc8cad2ff3094' }  
              const res = {
                  statuscode: 500,
                  userStatus:'null',
                  status: function(code){
                      this.statuscode = code;
                      return this
                  },
                  json: function(data){
                    this.userStatus = data.status;
                  }
                  
              };
              Authcontroller.getUserStatus(req, res, ()=>{}).then(()=>{
                  expect(res.statuscode).to.be.equal(200);
                  expect(res.userStatus).to.be.equal('I am new here');
                  done()
                  
                  
              })
        
       
    });
   
    after(function(done){
        User.deleteMany({})
        .then(()=>{
            return mongoose.disconnect();

        }).then(()=>{
            done();
        })
    })
})