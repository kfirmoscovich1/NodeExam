const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.auth = (req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need to send token to be here"})
  }
  try{
    const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
    req.tokenData = decodeToken
    next()
  }
  catch(err){
    res.status(401).json({err:"token not valid or expired"})
  }

}

exports.authAdmin = (req,res,next) => {
  const token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err:"You need to send token to be here"})
  }
  try{
    const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET)
    if(decodeToken.role != "admin"){
      return res.status(401).json({err:"You must be admin user to be here"})
    }

    req.tokenData = decodeToken
    next()
  }
  catch(err){
    res.status(401).json({err:"token not valid or expired"})
  }

}
