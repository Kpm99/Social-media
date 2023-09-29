const mongoose=require('mongoose');

const multer=require('multer');
const path=require('path')
const AVATAR_path = path.join('/uploads/users/avatars')
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    require:true
  }, 
  email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
      type:String,
      require:true
    },
    
    avatar:{
      type:String
    }

},{
    timestamps:true
})
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
})

//static 

userSchema.statics.uploadedAvatar=multer({storage:  storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_path;


const User=mongoose.model('User',userSchema);
module.exports=User;