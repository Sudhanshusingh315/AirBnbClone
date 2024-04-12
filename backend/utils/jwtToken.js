const jwt = require("jsonwebtoken");
module.exports.generateToken = async (res,tokenData) => {
  const token = jwt.sign(tokenData, 'meow',{
    expiresIn:"1h"
  });
  res.cookie('jwt',token,{
    httpOnly:true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
  console.log("sending token",token)
  return token;
};