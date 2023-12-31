const Comment=require('../models/comment');
const Post=require('../models/post');
const Like=require('../models/like');
const commentsMailer=require('../mailers/comments_mailer')
module.exports.create=async function(req,res){
        console.log(req.body)
        const post=await Post.findById(req.body.post)
        if(post){
          let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }
            )
            console.log(comment)
            post.comments.push(comment),
            post.save(),
            comment=await comment.populate('user','name email');
            commentsMailer.newComment(comment)
            if(req.xhr){
              return res.status(200).json({
                data:{
                  comment:comment
                },
                message:"Post created"
              })
            }
            res.redirect('/')
        } 
        
    
}

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
   
    if (comment.user == req.user.id) {
       let postId = comment.post;
       console.log('hello')
        await Comment.findByIdAndDelete(req.params.id);
        let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        await Like.deleteMany({likeable:comment._id,onModel:'Comment'})
        if (post) {
          return res.redirect('back');
        }
     } else {
       return res.redirect('back');
     }
  }
  catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};