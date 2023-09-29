const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy

const ExtractJWT=require('passport-jwt').ExtractJwt
const User=require('../models/user')


var opts = {
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codial'
}
passport.use(new JWTStrategy(opts,async function(jwtPayLoad,done){

    const user=await User.findById(jwtPayLoad._id)
    if(err){
        console.log("error")
        return;
    }
    if(user){
        return done(null,user)
    }
    else{
        return done(null,false)
    }
}))

module.exports=passport