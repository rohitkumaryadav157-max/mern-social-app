const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({ msg: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.json({ msg: "Signup successful", user });

  } catch (err) {
    res.json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }

    res.json({ msg: "Login success", user });

  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;