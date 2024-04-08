const jwt = require("jsonwebtoken");
module.exports.generateToken = async (tokenData) => {
  const token = jwt.sign(tokenData, 'meow',{
    expiresIn:"1h"
  });
  console.log("sending token",token)
  return token;
};