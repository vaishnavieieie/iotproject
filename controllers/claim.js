const mysql = require("mysql");
const nodemailer= require("nodemailer")
//data base instance
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

  exports.claim=(req,res)=>{
    const postid=req.body.postid
      console.log(postid)
    
    var sql="INSERT INTO `claim-user`( `id`, `name`, `email`) VALUES ('"+postid+"','"+req.session.username+"','"+req.session.email+"')";
    db.query(sql,(error,result)=>{
        if(error){
          return res.status(500).send(error);
        }else{
              var receiver="" //email sent to
              var sql1="SELECT email FROM `post-table` WHERE id="+"'"+postid+"'"
              db.query(sql1,(error2,result2)=>{
                if(error2){
                  console.log(error2)
                }else{
                  //console.log(result2[0].email)
                 
                  receiver=result2[0].email
                  //console.log(receiver)
                  //nodemailer
                          //nodemailer
                      var transporter=nodemailer.createTransport({
                        service:"gmail",
                        auth:{
                          user:process.env.EMAIL_ID,
                          pass:process.env.EMAIL_PASSWORD
                        }
                      });

                      var mailOptions={
                        from:"handstoservemail@gmail.com",
                        to:""+receiver,
                        subject:"A user has claimed your foodpackets!",
                        text:"Hello! User: "+req.session.username+" ,Email: "+req.session.email+" has shown interest in your food donation!Hurry!"
                      }

                      transporter.sendMail(mailOptions,function(error1,info){
                        if(error1){
                          console.log(error1)
                        }else{
                          console.log("Email sent:"+info.response)
                        }
                      });
                  //nodemailer ends
                }

              })
              

              res.redirect("/recipient");
          }
    })
}