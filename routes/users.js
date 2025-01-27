const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth} = require("../middlewares/auth");
const { userValid, UserModel, loginValid, createToken } = require("../models/userModel");
const router = express.Router();

router.get("/",(req,res) => {
  res.json({msg:"users endpoint"});
})

router.get("/info",auth,async(req,res) => {
  try{
    const data = await UserModel.findOne({_id:req.tokenData._id},{password:0})
    res.json(data);
  }
  catch (error) {
    console.log(error);
    res.status(502).json({err:"There problem come back later"})
  }
})

router.post("/", async (req, res) => {
  const validBody = userValid(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    console.log(req.body);
    if (!req.body.role) {
      req.body.role = "user";
    }
    const user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "******";
    res.status(201).json(user);
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({ err: "Email already in system", code: 11000 });
    }
    console.log(error);
    res.status(502).json({ err: "There problem come back later", error });
  }
});


router.post("/login",async(req,res) => {
  const validBody = loginValid(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const user = await UserModel.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({msg:"Email not found"})
    }
    const passwordValid = await bcrypt.compare(req.body.password,user.password)
    if(!passwordValid){
      return res.status(401).json({msg:"password worng !"})
    }
    const token = createToken(user._id);
    res.json({token})
  }
  catch (error) {
    console.log(error);
    res.status(502).json({err:"There problem come back later"})
  }
})


module.exports = router;