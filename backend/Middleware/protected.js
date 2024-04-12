const jwt = require("jsonwebtoken");

const protected = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   //   const token = req.headers.authorization.split(" ")[1];
//   console.log("token in the protected route", token);
//     const decoded = jwt.verify(token, "meow");
//     try {
//       if (decoded) {
//         req.user = decoded;
//         next();
//       } else {
//         res.state(500);
//         throw new Error("Token invalid, login again");
//       }
//     } catch (err) {
//       res.json({
//         [err.name]: err.message,
//       });
//     }

try {
    let token;

    // without the cookie parser we won't be able to do this
    console.log("this is req cookie",req.cookies);
    token = req.cookies.jwt;
    if (token) {
      try{
        const decoded  = jwt.verify(token,'meow');
        console.log("decoed token from authMiddleware",decoded);
        // also setting in the req object so that i can acceess it anywhere and at anytime i want
        req.user = decoded ;
        next();
      }catch(err){
        res.json(err.message);
      }
      
    } else {
      throw new Error("Not authorised, no token")
    }
  } catch (err) {
    res.json({[err.name]:err.message})
  }

};

module.exports = protected;
