const { hashSync, compareSync } = require("bcryptjs");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET = process.env.SECRET;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json("Existing email, try another email");
    await User.create({
      username,
      email,
      password: hashSync(password, 10),
    });
    res.status(200).json("User registered!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(403).json("Wrong email");

    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) return res.status(400).json("Wrong password");

    const accessToken = jwt.sign(
      {
        sub: user._id,
        isAdmin: user.isAdmin,
      },
      SECRET,
      {
        expiresIn: "3d",
      }
    );

    const returnUser = await User.findById(user._id).select(["-password"]);
    res.status(200).json({
      user: returnUser,
      token: accessToken,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const changeEmail = async (req, res) => {
  try {
    const userData = {
      password: req.body.password,
      email: req.body.email,
      userAccess: req.params.id,
    };

    let user = await User.findById(userData.userAccess);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      const comparePassword = compareSync(userData.password, user.password);
      if (!comparePassword) {
        res.status(400).json("Wrong password");
      } else {
        userData.email = user.email;
        user = await user.save();
        res.status(200).json("Email changed");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const changePassword = async (req, res) => {
  try {
    const userData = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      userAccess: req.params.id,
    };

    let user = await User.findById(userData.userAccess);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      const comparePassword = compareSync(userData.oldPassword, user.password);
      if (!comparePassword) {
        res.status(400).json("Wrong password");
      } else {
        hashNewPassword = hashSync(userData.newPassword, 10);
        user.password = hashNewPassword;
        user = await user.save();
        res.status(200).json("Password changed");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { registerUser, loginUser, changeEmail, changePassword };
