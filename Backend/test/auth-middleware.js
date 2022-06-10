const authMiddleware = require('../middleware/is-auth')
const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken')
//Unit test- Testing on unit of our application

//Use to group tests
describe('Auth Middleware', function(){
    

it('it should throw an error if no authorisationheader is present', function(){
    const req = {
        get: function(header){
            return null
        }
    };
    //call the authMiddleware and pass our request in, alongside the response  object and the next function , but we dont need thm in this case , so we pass in an empty object
    //Binding means we dont want to run the function ourself, we want rhe chai modile to call the function
    expect(authMiddleware.bind(this,req,{}, ()=>{})).to.throw('Not authenticated')
})

it('should throw an error if the authoraisation header is only one strinng', function(){
    const req= {
        req: function(headerNmae){
            return 'xyz'
        }
       
    };
    expect(authMiddleware.bind(this, req,{},()=>{})).to.throw()
})
    it('should throw an error if the token cannot be verified', function(){
        const req  = {
            get: function(headerName){
                return 'Bearer xyz'
            }
        }
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()
    })
    it('should yield a userId after decoding the token', function(){
        const req  = {
            get: function(headerName){
                return 'Bearer jdherire'
            }
        };
        
      //  using sinon stub to overide a third party package
        sinon.stub(jwt,'verify')
        jwt.verify.returns({userId:'abc'})
        //Overide jwt.verify method our own function so as to test if it returns a userid,
        //jwt.verify = function(){
        //    return { userId:'abc' }
      //  }
        authMiddleware(req,{},()=>{});
        expect(req).to.have.property('userId')
        expect(req).to.have.property('userId','abc')
        expect(jwt.verify.called).to.be.true
        jwt.verify.restore();
    })




})

//We don't write tests for external dependencies, such as jwt



