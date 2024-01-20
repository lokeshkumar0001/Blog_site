const UserModel = require('../models/userModel')

module.exports = async (req, res, next, id) => {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        next(new Error('User not found!'))
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
  