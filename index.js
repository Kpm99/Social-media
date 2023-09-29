const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const port=8000;
const app=express();
const db=require('./config/mongoose')
const cookieParser = require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const passportJWT=require('./config/passport_jwt_strategy')
const googlepassport=require('./config/passport-google-oath-strategy')
const MongoStore=require('connect-mongo');
const flash=require('connect-flash')
const customMware=require('./config/middleware');
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('./assets'));
//make uploads path available to browser
app.use('uploads',express.static(__dirname+'/uploads'))
app.use(expressLayouts);
//  app.use(passport.setAuthenticatedUser)

//set up view engine
app.set('view engine','ejs');
app.set("views",'./views')

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(session({
    name:'codial',
    secret:'xyzabc',

    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codial',
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err|| 'connected to mongo-store')
    }
    ),
    

    
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMware.setFlash)

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in server ${err}`)
    }

    console.log(`server is running on port ${port}`);

})

