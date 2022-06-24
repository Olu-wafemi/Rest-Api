const expect = require('chai').expect
const sinon= require('sinon')
//Sinon is for stubbing

const mongoose =  require('mongoose')


const User= require('../models/user')

const Post= require('../models/post')

const Feedcontroller = require('../controllers/feed')
//Test the login fucntion, if the User is found or if the database failed or if the user is not found.\
describe('Feed Controller', function(){

    before(function(done){
        mongoose.connect(
            'mongodb+srv://EffEmm:Oluwafem4@cluster0.mjz0a.mongodb.net/mynewbase?retryWrites=true&w=majority'
          
        ).then(result=>{
             const user = new User({
                 email:'test@testinggg.com',
                 password: 'tesla',
                 name: 'Test',
                 posts: [],
                 _id:'61ec09913d2dc8cad2ff3093'

             })
             return user.save()
        }).then(()=>{

            done();
        })

    })
    //Stubbing  the FindOne method
    //The it block is used for an actual testcase
    //Done is to used to make mocha run the test asynchronously, basically tells mocah to wait
    it('should add a created post to the post of the creator', function(done){
        
        
        const req = {
            body:{
                title: 'Testing Post',
                content: 'A testing post',
            },
            file:{
                path: 'abc',
            },
            
                userId: '61ec09913d2dc8cad2ff3093'
            
        };
        const res = {status: function(){
            return this
        }, json:function(){}}
  Feedcontroller.createPost(req,res,()=>{}).then((saveduser)=>{
    expect(saveduser).to.have.property('posts')
    expect(saveduser.posts).to.have.length(1);
    done()
  })

        
    })
    
   
    after(function(done){
        User.deleteMany({})
        .then(()=>{
            return mongoose.disconnect();

        }).then(()=>{
            done();
        })
    })
})