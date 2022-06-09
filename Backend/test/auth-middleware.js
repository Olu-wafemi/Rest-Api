const authMiddleware = require('../middleware/is-auth')
const expect = require('chai').expect;
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

})