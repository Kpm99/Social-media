const nodeMailer=require('../config/nodemailer');
//another way of exporting function
exports.newComment=(comment)=>{

    console.log("inside newComment",comment)
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from:'codial.com',
        to:comment.user.email,
        subject:"New Comment",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log("message sent",info)
        return
    })
}