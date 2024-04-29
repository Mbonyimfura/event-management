const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user

const registerUser = async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send();
    }
  };
//
const loginUser =  async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).send();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).send();
      }
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {}
      );
      res.cookie("token", token).status(200).send(user);
    } catch (error) {}
  }
//
const profileUser =  async (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        if (error) throw error;
        const { name, email,role, _id } = await User.findById(userData.id);
        res.send({ name, email,role, _id });
      });
    } else {
      res.send(null);
    }
  };
  
 const logoutUser = async(req, res) => {
    res.cookie("token", "").send(true);
  };

  module.exports = {
    registerUser, loginUser, logoutUser,profileUser
  }