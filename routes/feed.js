const express= require('express')
const {body} =  require('express-validator');
const isAuth =  require('../middleware/is-auth')
const feedControlleer = require('../controllers/feed')

const router= express.Router()

 
//Isauth is the middleware that is used for authentication by making sure a token is sent from the frontend and vslidated by the backend before proceeding the other
router.get('/posts',isAuth,feedControlleer.getPosts);



router.post('/posts',[
    body('title')
    .trim()
    .isLength({min: 7}),
    body('content')
    .trim()
    .isLength({min: 5})
], isAuth,feedControlleer.createPost)


router.get('/post/:postId', isAuth,feedControlleer.getPost);

/*router.put('/posts/:postId',isAuth,[
    body('title')
    .trim()
    .isLength({min: 5}),
    body('content')
    .trim()
    .isLength({min: 5})
], feedControlleer.updatePost)*/

router.put('/status',isAuth, feedControlleer.postStatus)
router.get('/status', isAuth, feedControlleer.getStatus)
router.delete('/posts/:postId',isAuth, feedControlleer.deletePost);

module.exports = router
