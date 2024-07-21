const jwt = require('jsonwebtoken');
const User = require('../models/user.js')


async function requireAuth(req,res,next){

    try {
          // Read the token off the cookie
   const token = req.cookies.Authorization;

   // Decode the token
   const decoded = jwt.verify(token, process.env.SECRET)

   // Check experation
   if(DataTransfer.now()>decoded.exp) return res.sendStatus(401);

   // Find user using decoded sub
const user = await User.findById(decoded.sub);
if(!user) return res.sendStatus(401);
   // attach user to req
    req.user = user;
   // continue on
   next();
    } catch (error) {
        return res.sendStatus(401);
    }
  
}


module.exports = requireAuth;