const express=require("express");
const router= express.Router();
const authcontroller=require("../controllers/auth");
const authdonor=require("../controllers/donor");
const authdeletepost=require("../controllers/deletepost");
const authsorting=require("../controllers/sorting");
const authclaim=require("../controllers/claim");
const authcontact=require("../controllers/contact");

//new user registration  
router.post("/register", authcontroller.register);
  
//login registered user

router.post("/login",authcontroller.login);

//grab form data from donor form

router.post("/donor",authdonor.donor);

//delete the seleted post
router.post("/account",authdeletepost.deletepost);

//sorting of elements
router.post("/sorting",authsorting.sorting);

//user claim
router.post("/claim",authclaim.claim);

//contact form
router.post("/contact",authcontact.contact);


  module.exports=router;