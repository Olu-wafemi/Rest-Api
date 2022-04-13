const express= require('express');
const path = require('path')

const moongoose = require('mongoose');
const multer = require('multer')

const app = express()


const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
       cb( null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb) =>{
    if( file.mimetype === 'image/png' || file.mimetype==='images/jpg' || file.mimetype==='image/jpeg'){
        cb(null, true);

    } else{
        cb(null, false)
    }
}

const bodyParser = require('body-parser')
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const { default: mongoose } = require('mongoose');
const { ConnectionClosedEvent } = require('mongodb');
const { rmdirSync } = require('fs');
//Parsing incoming json requests
app.use(bodyParser.json())
//Middleware for image Uploading
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
//Serving the images folder to the frontend

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
    
});

//Cors middleware to communicate between client and server rinning on differnt ports




//Middleware that forwrds any incoming requests that has /feeds to feedRoutes
app.use('/feed',feedRoutes)
app.use('/auth',authRoutes)
//This middleware collects error from the routes middleware and returns the detail of the error back to the frontend
app.use((error,req,res, next)=>{

    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data});
 
})




//Parsing incoming json requests
app.use(bodyParser.json())

mongoose.connect(
    'mongodb+srv://EffEmm:Oluwafem4@cluster0.mjz0a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
   //'mongodb+srv://Femi:Oluwafem4@cluster0.6kvae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then(result=>{
    console.log('connected')
    
    app.listen(2020);
    

}
    
).catch(err=> console.log(err)) 



