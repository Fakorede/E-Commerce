const router = require("express").Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");

// @desc    Signup route
// @route   POST /api/v1/auth/signup
// @access  Public
router.post("/auth/signup", async (req, res) => {
  if (!req.body.emai || !req.body.email) {
    res.json({
      success: false,
      message: "Please enter email or password"
    });
  } else {
    try {
      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await newUser.save();

      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800 // 1 week
      });

      res.json({
        success: true,
        token,
        message: "New user successfully created!"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
});

module.exports = router;
