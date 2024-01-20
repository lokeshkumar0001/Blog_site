const UserModel = require('../models/userModel')

module.exports.register = async (req, res, next) => {
  try {
    let user = new UserModel();
    user.username = req.body.username
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password
    
    const doc = await user.save();
    const userJson  = await user.toAuthJson();
    
    return res.json({ user: userJson})
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        error: "Enter email or password to continue",
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      const isValid = await user.validatePass(password);
      if (isValid) {
        const userJson = await user.toAuthJson();
        res.json({user: userJson})
      } else {
        res.json({
          success: false,
          message: "Enter correct password",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid user",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if(!user){ return res.sendStatus(401); }
    return res.json({user: await user.toAuthJson()});
  } catch (error) {
    next(error);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if(!user){ return res.sendStatus(401); }
    return res.json({message: 'user logged out',user: {token: null}});
  } catch (error) {
    next(error);
  }
};
