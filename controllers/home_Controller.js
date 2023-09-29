//controllers are set of actions 
const User=require('../models/user');
const Post=require('../models/post');
console.log('homeController is fine');
module.exports.home=async function(req,res){
    
//     return res.render('home',{
//     title:"home"
    
// });

let post=await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    },
    // populate:{
    //     path:'likes'
    // }
})
// .populate('likes')

let users=await User.find({}) //for fetching all user profiles
return res.render('home',{
    title:"home",
    posts:post,
    all_users:users
})
}


