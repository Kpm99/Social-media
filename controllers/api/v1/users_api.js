const User=require("../../../models/user");
const jwt=require('jsonwebtoken')

module.exports.createsession= async function(req,res){

    let user=await User.findOne({email:req.body.email})

    if(!user || user.password!=req.body.password){
        return res.json(420,{
            message:"user id or password"
        })
    }
    return res.json(200,{
        message:"Sign In successful,token is ready",
        data:{
            token: jwt.sign(user.toJSON(),'codial',{expiresIn:'100000'})
        }
        
    })
    }
    
 