const User = require("../Models/userModel");
const { generateToken } = require("../utils/jwtToken");

// LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if ((!email || !password)) {
      throw new Error("Fill all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists && userExists.matchPassword(password)) {
      console.log("inside after password verification")
      const token = await generateToken(res,{
        id: userExists._id.toHexString(),
        name: userExists.name,
      });
      console.log("login token",token);
      res.status(201).json({
        token,
        name:userExists.name
      });
    } else {
      res.status(400);
      throw new Error("Invalid username or password");
    }
  } catch (err) {
    res.json({
      [err.name]: err.message,
    });
  }
};

// REGISTER USER
exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Bloguser already Exists");
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    if (newUser) {
      const token = await generateToken(res,{
        id: newUser._id.toHexString(),
        name: newUser.name,
      });
      console.log("recieved token", token);
      res.status(201).json({
        token,
        name:newUser.name
      });
    }
  } catch (err) {
    res.json({
      [err.name]: err.message,
    });
  }
};