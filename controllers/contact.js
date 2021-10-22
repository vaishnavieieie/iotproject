const nodemailer= require("nodemailer")

exports.contact=(req,res)=>{
    const {name,email,subject,message} = req.body
//nodemailer starts
    var transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:process.env.EMAIL_ID,
          pass:process.env.EMAIL_PASSWORD
        }
      });

      var mailOptions={
        from:email,
        to:process.env.EMAIL_ID,
        subject:"Contact form : "+name+" : "+subject,
        text:"From: "+email+" : "+message
      }

      transporter.sendMail(mailOptions,function(error1,info){
        if(error1){
            alert("could not send email!")
          console.log(error1)
        }else{

            alert("Email was sent!")
          console.log("Email sent:"+info.response)
        }
      });

    res.redirect("/contact")
//nodemailer ends
}