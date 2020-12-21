const User = require("../models/User.js");
const { sessionizeUser } = require("../utils/helpers");
require("dotenv").config();

// @desc      Register
// @route     POST /api/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //check if email is valid
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(email).toLowerCase())) {
      // return next(new BadRequest("Email not valid").response());
      res.json({
        success: false,
        message: "Email not valid",
      });
    }

    const newUser = new User({ username, email, password });
    const sessionUser = sessionizeUser(newUser);

    await newUser.save();
    req.session.user = sessionUser;

    res.json({
      success: true,
      data: sessionUser,
    });
  } catch (err) {
    console.log(err);
    if (err.message.includes("E11000")) {
      // return next(new DuplicateUser("Email already in use").response());
      res.json({
        success: false,
        message: "Email already in use",
      });
    }

    // return next(new GeneralError("Server error").response());
    res.json({
      success: false,
      message: "Server error... please contact admin",
    });
  }
};

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user);
      req.session.user = sessionUser;
      // res.json(sessionUser);
      res.json({
        success: true,
        data: sessionUser,
      });
    } else {
      // return next(
      //   new InvalidCredentials("Invalid login credentials").response()
      // );
      res.json({
        success: false,
        message: "Invalid login credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

// @desc      Logout
// @route     DELETE /api/auth/logout
// @access    Private
exports.logout = async (req, res, next) => {
  try {
    const user = req.session.user;

    if (user) {
      req.session.destroy((err) => {
        if (err) throw err;
        res.clearCookie(process.env.SESS_NAME);
        res.json({
          success: true,
          data: user,
        });
      });
    } else {
      // return next(new GeneralError("Something went wrong").response());
      res.json({
        success: false,
        message: "Server error logging out",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
};

//  @desc:      Check if user id logged in or not
//  @route:     GET /api/auth/status
//  @access:    Private
exports.status = (req, res) => {
  res.json(req.session);
};

// @desc      Update password
// @route     PUT /api/auth/password
// @access    Private
exports.updatePassword = async (req, res, next) => {
  try {
    // check if new password is empty
    const { password } = req.body;

    if (password === "" || password === undefined) {
      res.json({
        success: false,
        message: "Password cannot be empty",
      });
    }

    // find if user
    const user = await User.findById(req.session.user.userId);

    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
    }

    // update password
    user.password = password;
    await user.save();

    // send success status
    res.json({
      success: true,
      message: "Password has been updated",
    });
  } catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
};
