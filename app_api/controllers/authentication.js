const passport = require('passport');
const mongoose = require('mongoose');

// getting this to work for the auth was a pain but it should fix load order
require('../models/user');
const User = mongoose.model('users');

// REGISTER USER
const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  try {

    //testing this controller as well 7/26/26
    //throw new Error("Testing centralized authentication error");


    const savedUser = await user.save();
    const token = savedUser.generateJWT();

    return res.status(200).json({ token });

  } 
  catch (err) {
    next(err);
  }
};

// LOGIN USER
const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
     return next(err);
    }

    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }

  })(req, res);
};

module.exports = {
  register,
  login
};