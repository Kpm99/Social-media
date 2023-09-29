const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codial');
const db=mongoose.connection;

db.on('error', function(err){
    if(err){
        console.log(err.message);
    }
})

db.once('open',function(){
    console.log("database connected");
})

module.exports=db;