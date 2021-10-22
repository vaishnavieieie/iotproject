const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
var session = require("express-session");
const nodemailer= require("nodemailer")

const app = express();

//image upload dependencies
  const busboy = require("then-busboy");
	const fileUpload = require('express-fileupload'); 
  const http = require('http').createServer(app);

//   //chat start
//   const io=require("socket.io")(http)
//   io.on("connection", function (socket) {
//     console.log("User connected", socket.id);
// });
// var users = [];
 
// io.on("connection", function (socket) {
//     console.log("User connected", socket.id);
 
//     // attach incoming listener for new user
//     socket.on("user_connected", function (username) {
//         // save in array
//         users[username] = socket.id;
 
//         // socket ID will be used to send message to individual person
 
//         // notify all connected clients
//         io.emit("user_connected", username);
//     });
// });

// // listen from client inside IO "connection" event
// io.on("send_message", function (data) {
//   // send event to receiver
//   var socketId = users[data.receiver];

//   io.to(socketId).emit("new_message", data);
// });
  
// //chat end

dotenv.config({ path:"./.env"})



app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set("view engine", "ejs");

app.use(express.static("public"));//to use all static files like css and js 

app.use(express.urlencoded({extended:false}));//allows us to grab data from registration form 
app.use(express.json());//makes sure the data we receive is in json format

app.use(fileUpload())

//Database setup
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST ,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
//Database Connection
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("My sql connected");
  }
});

//defining routes
app.use("/",require("./routes/pages"));
app.use("/auth",require("./routes/auth"));

app.get("/donor",(req,res)=>{
  if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send("Please login")
	}
	res.end();
});

app.get("/logout",(req,res)=>{
    if(req.session.loggedin){
      req.session.loggedin=false;
    }
    res.redirect("/")
})

// app.get("/hello",(req,res)=>{
//   res.render("register1")
// })

app.get("/contact",(req,res)=>{
  res.render("contact",{sess:"Yes"})
})

app.post("/", function (req, res) {});

// const https=require("https")
// const NewsAPI=require("newsapi")

//news
app.get("/news",function(req,res){
  const newsapi = new NewsAPI('47eeb8c931d448959885f81bb536baf1');
  newsapi.v2.topHeadlines({
    q: '',
    category: 'health',
    language: 'en',
    country: 'in',
    
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
  // newsapi.v2.everything({
  //   q: 'starvation',
  //   // sources: 'bbc-news,the-verge',
  //   // domains: 'bbc.co.uk, techcrunch.com',
  //   from: '2021-10-01',
  //   to: '2021-10-02',
  //   language: 'en',
  //   sortBy: 'relevancy',
  //   page: 2
  // }).then(response => {
  //   console.log(response);
  //   /*
  //     {
  //       status: "ok",
  //       articles: [...]
  //     }
  //   */
  // });
  // var apiKey="47eeb8c931d448959885f81bb536baf1"
  // const url='https://newsapi.org/v2/top-headlines?' +
  // 'country=india&' +
  // 'apiKey='+apiKey;

  // https.get(url,function(response){
  //   console.log(response)
  // })

  // res.write("news")
});
//autocomplete:
// app.get("/auto",function(req,res){
//   res.render("auto")
// })
app.listen(3000, function () {
  console.log("Project running on port 3000");
});
