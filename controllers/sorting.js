const mysql = require("mysql");
//data base instance
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

  exports.sorting=(req,res)=>{
      var sort_location =req.body.sorting;
      sort_location=sort_location.toUpperCase()
      //console.log(sort_location)
    
      var sql="SELECT * FROM `post-table` WHERE location="+"'"+sort_location+"'";
      db.query(sql,(error,result)=>{
          if(error){
            return res.status(500).send(error);
          }else{
            result.reverse()
            res.render("recipient",{posts:result,sess:"Yes"})
          }
      })
  }