const express=require("express");
const router= express.Router()
//************************************** */
//database connection start

const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

//data base connection end  

router.get("/", async(req, res)=> {
  let num_users//total users
  let num_fed//people fed
  // to get number of users:
//queries
  // db.query("SELECT * FROM users",async(error,results) => {
  // if(error){
  //   console.log(error)
  //   num_users = 0;
  // }else{
  //   num_users=results.length
  //   console.log("hello",num_users)
  //   db.query("SELECT * FROM `post-table`",async(error,results)=>{
  //     if(error){
  //       console.log(error)
  //       num_fed = 0;
  //     }else{
  //       num_fed = 0;
  //       results.forEach(function(result){
  //         num_fed += result.people
  //       })
  //       console.log(num_fed)
  //     }
    
  //     });
  // }

  // });

// //to get people fed:
//  db.query("SELECT * FROM `post-table`",async(error,results)=>{
//   if(error){
//     console.log(error)
//     num_fed = 0;
//   }else{
//     num_fed = 0;
//     results.forEach(function(result){
//       num_fed += result.people
//     })
//     console.log(num_fed)
//   }

//   });
//   console.log("outside",num_users)
//   console.log("outside",num_fed)

// if(req.session.loggedin){
//   res.render("home",{sess:"Yes",num_users:num_users,num_fed:num_fed});
// }else{
//   res.render("home",{num_users:num_users,num_fed:num_fed});
// }
  
 //get number of users
    db.query("SELECT * FROM users",async(error,results) => {
      if(error){
        console.log(error)
        num_users = 0;
      }else{
          num_users=results.length
          //console.log("hello",num_users)
          //get number of peoplr fed
          db.query("SELECT * FROM `post-table-copy`",async(error1,results1)=>{
            if(error1){
              console.log(error1)
              num_fed = 0;
            }else{
              num_fed = 0;
              results1.forEach(function(result){
                num_fed += parseInt(result.people)
              })
              //console.log(num_fed)
              //if logged in send session yes
              if(req.session.loggedin){
                res.render("home",{sess:"Yes",num_users:num_users,num_fed:num_fed});
              }
              //else dont send session
              else{
                res.render("home",{num_users:num_users,num_fed:num_fed});
              }
              
            }
          
            });
        } 
    
      });
    
  });

  //render register page
router.get("/register",  (req, res)=> {
    if(req.session.loggedin){
      res.render("register",{sess:"Yes"});
    }
    else{
      res.render("register");

    }
    
  });
//render about page
router.get("/about",  (req, res)=> {
  if(req.session.loggedin){
    res.render("about",{sess:"Yes"});
  }else{
    res.render("about")
  }
    
  });
  
//render donor page for form
router.get("/donor",(req,res)=>{
  if(req.session.loggedin){
    res.render("donor",{sess:"Yes"})
  }
  else{
    res.redirect("/register")
  }
 
})


//render recipient page to see all posts
router.get("/recipient",(req,res)=>{
  
    //if user has logged in
    if(req.session.loggedin){
      //get all the rows from table
      var sql="SELECT * FROM `post-table` WHERE 1";

      db.query(sql, (error, result) => {
          if (error) {
              return res.status(500).send(error);
          }
          else {
              // res.send(result[0].name)
              result.reverse()
              res.render("recipient",{posts:result,sess:"Yes"})
          }
      });

    }
    //if user has not logged in redirect to register/login
    else{
      res.redirect("/register");

    }

});

//to render users account page
router.get("/account",(req,res)=>{
  if(req.session.loggedin){
    var sql="SELECT * FROM `post-table` WHERE email="+"'"+req.session.email+"'";

      db.query(sql, (error, result) => {
          if (error) {
              return res.status(500).send(error);
          }
          else {
              var sql1="SELECT * FROM `claim-user` WHERE 1";
              db.query(sql1,(error1,result1)=>{
                if(error1){
                  return res.status(500).send(error);
                }else{
                  result.reverse()
                  res.render("account",{posts:result,sess:"Yes",claims:result1})
                }
              })
              // res.send(result[0].name)
              
          }
      });
  }
  else{
    res.redirect("/register")
  }
})

//services page
router.get("/service",(req,res)=>{
  if(req.session.loggedin){
    res.render("service",{sess:"Yes"})
  }
  else{
    res.render("service")
  }
  
});

//contacts page
router.get("/contact",(req,res)=>{
  if(req.session.loggedin){
    res.render("contact",{sess:"Yes"})
  }else{
    res.render("contact")
  }
  
})
  module.exports=router