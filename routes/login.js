const express=require("express");
const router= express.Router();
const authcontroller=require("../controllers/authlogin");

  
router.post("/register", authcontroller.register);
  

  module.exports=router