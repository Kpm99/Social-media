// const mongoose=require('mongoose');
// const likeSchema=new mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId
//     },
//     //defines object id of user
//     likeable:{
//         type:mongoose.Schema.Types.ObjectId,
//         require:true,
//         refPath:'onModel'
//     },
//     //field used for defining type of liked object
//     onModel:{
//         type:String,
//         require:true,
//         enum:['Post','Comment']
//     }



// },{
//     timestamps:true
// })

// const like=mongoose.model('like',likeSchema);
// module.exports=like