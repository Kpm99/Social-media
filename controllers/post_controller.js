const Post=require('../models/post')
const Comment=require('../models/comment');

// const Like=require('../models/like')
module.exports.create=async function(req,res){
   let post= await Post.create({
        content:req.body.content,
        user:req.user._id

    })
    //ajax requests
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:'post created'
        })
    }
    return res.redirect('back')
    
}

module.exports.destroy=async function(req,res){  
    let post=await Post.findById(req.params.id);
    if(post.user==req.user.id){
        post.deleteOne({user:req.params.id})
        await Like.deleteMany({likeable:post,onModel:'Post'})
        await Like.deleteMany({_id:{$in:post.comments}})
        let comment=await Comment.deleteMany({post:req.params.id})

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'post deleted'
            })
        }
        if(comment){
            res.redirect('back');
        }
    }else{
        return res.redirect('back');
    }
    

}

