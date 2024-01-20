const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
module.exports.isAuth = async (req, res, next) => {
  try {
    if (
      req.headers.authorization ||
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token,JWT_SECRET) 

      req.payload = payload
      next()
    }else{
        next(new Error('No token found')) 
    }
  } catch (error) {
     err = new Error('Not Authorized')
     next(err)
  }
};
