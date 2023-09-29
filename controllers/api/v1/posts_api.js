const Post=require('../../../models/post');
const Comment=require('../../../models/comment')
module.exports.index=async function(req,res){
    let post=await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    }
})
    return res.json(200,{
        message:"list of messages",
        posts:post
    })
}

module.exports.destroy=async function(req,res){  
    let post=await Post.findById(req.params.id);
    // if(post.user==req.user.id){
        post.deleteOne({user:req.params.id})

        let comment=await Comment.deleteMany({post:req.params.id})

        
        if(comment){
            res.json(200,{
                message:"post and comments deleted successfully"
            });
        }
    //  }else{
    //     return res.redirect('back');
    // }
    

}

