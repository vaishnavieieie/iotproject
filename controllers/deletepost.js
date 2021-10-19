const mysql = require("mysql");
//data base instance
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

  exports.deletepost=(req,res)=>{
      const idbutton=req.body.idbutton
      console.log(idbutton)
    
      var sql="DELETE FROM `post-table` WHERE id="+"'"+idbutton+"'";
      db.query(sql,(error,result)=>{
          if(error){
            return res.status(500).send(error);
          }else{
              var sql1="DELETE FROM `claim-user` WHERE id="+"'"+idbutton+"'";
              db.query(sql1,(error1,result1)=>{
                if(error){
                    return res.status(500).send(error1);
                  }else{
                    res.redirect("/account")
                  }
              })
            //   res.redirect("/account")
          }
      })
  }