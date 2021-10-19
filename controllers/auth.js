const mysql = require("mysql");

const bcrypt=require("bcryptjs")

const md5=require("md5");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });


  //sessions:




exports.register=(req,res)=>{
    //console.log(req.body);
    //access data from registration form
     const {name, email, psw, pswrepeat} = req.body

//to check if username already exists
     db.query("SELECT name FROM users WHERE name = ?" ,[name],async(error,results)=>{
        if(error){
          console.log(error)
        }
        else if(results.length>0){
          return res.render("register",{message:"This name already exists!"});
        }

    });

//to check if email already exists
     db.query("SELECT email FROM users WHERE email = ?" ,[email],async(error,results)=>{
         if(error){
            console.log(error)
         }
         if(results.length>0){
             return res.render("register",{message:"This email already exists!"});
         }
         else if( psw!==pswrepeat){
            return res.render("register",{message:"The passwords do not match!"});
         }
         //encrypt password
         //let hashedPassword=await bcrypt.hash(psw,8);
         hashedPassword=md5(psw);
         
          // Store hash in your password DB.
           db.query("INSERT INTO users SET ?",{name:name,email:email,password:hashedPassword},(error,results)=>{
            if(error){
              console.log(error);
            }
            else{
              //console.log(results);
              return res.render("register",{message1:"User registered!"});
            }
          });
         

         //insert data to table:
         
         
         console.log(hashedPassword);
     });


   // res.send("Form submitted")
}


//login existing user
exports.login=async(req,res)=>{
  
    //check if user exists
    const{email,psw}=req.body;
    //console.log(email)
    db.query("SELECT email FROM users WHERE email=?",[email],async(error,results)=>{
        if(error){
          console.log(error)
        }
        if(results.length>0){
          db.query("SELECT * FROM users WHERE email=?",[email],async(error,ans)=>{
            if(error){
              console.log(error);
  
            }
            else {
              hashedPassword=md5(psw);
              //console.log(hashedPassword)
              if(ans[0].password==hashedPassword){
                //user login
                req.session.loggedin = true;
                req.session.username = ans[0].name;
                req.session.email=email;
                //response.redirect('/home');
                res.redirect("/")
              }else{
                return res.render("register",{message:"Incorrect Password!"})
              }
              
            }
          }) 
        }
        else{
         return res.render("register",{message:"Email not found!"})
        }
    })
  

}