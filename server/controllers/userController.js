const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/user.js")

async function signup(req,res){
    try {
         // Get the email and password of req body
    const {email,password} = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password,8);
 
     // create a user with data
     await User.create({email,password: hashedPassword});
 
     // respond
     res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
   
}

async function login(req,res){
    // get the email and password off rq body
    const {email,password} = req.body;
    // Find the user with requested email
    const user = await User.findOne({ email });
   if(!user) return res.sendStatus(401)
    // compair sent in password with found user password
  const passwordMatch =  bcrypt.compareSync(password,user.password)
   if(!passwordMatch) return res.sendStatus(401);
    // create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
   const token = jwt.sign({ sub: user._id, exp}, process.env.SECRET);
    // set the cookie
    res.cookie("Authorization",token,{
        expires: new Date(exp),
        httpOnly:true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production",
    })

    // send it
    res.sendStatus(200);
}


function logout(req,res){
    res.clearCookie("Authorization");
    res.sendStatus(200);
}

function checkAuth(req,res){
  console.log(req.user);
  res.sendStatus(200);
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
};
