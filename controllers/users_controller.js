const fs=require('fs');
const path=require('path')
const User=require('../models/user');
    module.exports.profile = async function(req, res) {
      let user;    
      try {
             user = await User.findById(req.params.id);
             if(user){
              return res.render('user_profile', {
                title: 'user profile',
               profile_user: user
             });
             }else{
              return res.redirect('/');
             }
            // console.log(user)
           
          } catch (err) {
            console.error(err);
            // Handle error and send appropriate response
            return res.status(500).send('Internal Server Error');
          }
        }
     // if(req.cookies.userId){
     //      const user= await User.findById(req.cookies.userId)
     //           if(user){
     //                return res.render('user_profile',{
     //                     title:'user profile',
     //                     user:user
     //                })
     //           }
     //           else{
     //                return res.redirect('/users/signIN')
     //           }
          
     // }
     // else{
     //      return res.redirect('/users/signIN')
     // }

module.exports.update=async function(req,res){
  if(req.user.id==req.params.id){
    
    // check if user is logged in
    try{ 
    let user= await User.findById(req.params.id);
  // console.log(user)
    User.uploadedAvatar(req,res,function(err){
      if(err){
        console.log("multer error",err)
      }
      console.log(req.file)
    
      user.name=req.body.name
      user.email=req.body.email
      if(req.file){
      //saving path of file
      if (user.avatar){
        // fs.unlinkSync(path.join(__dirname, '..', user.avatar));
    }
        user.avatar=User.avatarPath+'/'+req.file.filename
      }
    user.save();
    return res.redirect('back')
  })
}catch(err){
  req.flash('error',err);
  return res.redirect('back')
}
  // console.log(req.body);
  
  // if(user){ 
  //   return res.redirect('back')
  // }
}
 else{
   return res.status(401).send('unauthorized')
 }
}

module.exports.signup=function(req,res){
  
     return res.render('user_signup',{
          title:"Sign Up page"
     })
}

module.exports.signin=function(req,res){
  if(req.isAuthenticated()){
    res.redirect('/users/profile');
}else{
    return res.render('user_signin',{
        title:"Codial|sign in"
    })
}
 
}
// get sign up  data
// module.exports.create = async function (req, res) {
//   if (req.isAuthenticated()) {

//       return res.redirect('/users/profile');
//   }
//   if (req.body.password != req.body.confirm_password) {

//       return res.redirect('back');
//   }
//   try {
//      const user = await User.findOne({ email: req.body.email });
//       if (!user) {
//           await User.create(req.body);
//           return res.redirect('/users/signIN');
//       } else {
//           return res.redirect('/users/signIN');
//       }

//   } catch (err) {
//       console.log("Error: ", err);
//       return;
//   }
//   };

module.exports.create= async function(req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });
    console.log(req.body)
    if (!user) {
      await User.create({email:req.body.email,name:req.body.username,password:req.body.password});
      return res.redirect('/users/signIN');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('error', err);
    return;
  }
}


// sign and create user session

module.exports.createsession= function(req,res){
   req.flash('success','logged in Successfully')
  return res.redirect('/');

}
// module.exports.createSession= async function(req,res){

//      const user=await User.findOne({email:req.body.email});
//      try{     
//      if(user){
//                if(user.password!=req.body.pass){
//                     return res.redirect('back')
//                }
//                res.cookie('userId',user.id)
//                return res.redirect('/users/profile')
//           }
//           else{
//                return res.redirect('back');
//           }
//      }catch (err) {
//           console.log('error', err);
//           return;
//         }
//      }
module.exports.destroy=function(req,res){
  req.logout(function(err) {
    if (err) { 
      return next(err);
     }
    req.flash('success','logged out Successfully');
    res.redirect('/');
  });
  
}