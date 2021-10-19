const mysql = require("mysql");
//data base instance
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });
//to get current date and time
var date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
 let seconds = date_ob.getSeconds();
// console.log(year + "-" + month + "-" + date);
var datetime=date + "-" + month + "-" + year + "  " + hours + ":" + minutes+":"+seconds
// console.log(hours + ":" + minutes);

//on post from donor 
  exports.donor=(req,res)=>{
      //console.log(req.body)
      message="";
      const {quantity,description,uploaded_image,number,address} = req.body
      var location=req.body.location
      const name =req.session.username
      const email=req.session.email
      //console.log(name,email)
      if (!req.files)
				{return res.status(400).send('No files were uploaded.');}
        var file = req.files.uploaded_image;
        var img_name=file.name;
        // console.log(img_name)    
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/jpg" ){      
            file.mv("public/donor-images/"+file.name,function(err){
                if(err){
                    return res.status(500).send(err);
                }
                location=location.toUpperCase()
                var sql="INSERT INTO `post-table`( `name`, `location`, `number`, `description`, `image`, `people`, `email`,`datetime`,`address`) VALUES ('"+name+"','"+location+"','"+number+"','"+description+"','"+img_name+"','"+quantity+"','"+email+"','"+datetime+"','"+address+"')";

                db.query(sql, (error, result) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    else {
                        //insert into post table copy
                        var sql1="INSERT INTO `post-table-copy`( `name`, `location`, `number`, `description`, `image`, `people`, `email`,`datetime`) VALUES ('"+name+"','"+location+"','"+number+"','"+description+"','"+img_name+"','"+quantity+"','"+email+"','"+datetime+"')";
                        db.query(sql1,(error1,result1)=>{
                            if(error1){
                                return res.status(500).send(error);
                            }
                            else{
                                res.redirect("/")
                            }
                        })
                        //console.log(datetime)
                        
                    }
                })

            })
        }

  }