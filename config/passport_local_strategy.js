const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    async function(email, password, done) {
        let user;
        try {
             user = await User.findOne({ email: email });
            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
    }));
    //  function(email,password,done){
    //     User.findOne({email:email},function(err,user){
    //         if(err){
    //             console.log('error in finding user');
    //             return done(err)
    //         }
    //         if(!user || user.password!=password){
    //             console.log('invalid password')
    //             return(null,false)
    //         }

    //         return done(null,user)
    //     })
        
   // }

//serializing user

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing user

passport.deserializeUser( async function(id, done){
    let user;
    try{
        user = await User.findById(id);
        return done(null, user);
    } catch(err){
        console.log("Error in finding user --> Passport");
        return done(err);
    }
    
});


 passport.checkAuthentication=function(req,res,next){
     if(req.isAuthenticated()){
         return next();
     }
     return res.redirect('/users/signIN');
 };

 passport.setAuthenticatedUser=function(req,res,next){
     if(req.isAuthenticated()){
         res.locals.user=req.user;

     }
     next();
 };


module.exports = passport;