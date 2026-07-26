const passport = require('passport');
const mongoose = require('mongoose');

// getting this to work for the auth was a pain but it should fix load order
require('../models/user');
const User = mongoose.model('users');

// REGISTER USER
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  try {
    const savedUser = await user.save();
    const token = savedUser.generateJWT();

    return res.status(200).json({ token });

  } catch (err) {
    return res.status(400).json(err);
  }
};

// LOGIN USER
const login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      return res.status(404).json(err);
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