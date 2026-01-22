const router = require("express").Router();
const User = require("../../models/User");
const passport = require("passport");
const { signToken } = require("../../utils/auth");

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = signToken(req.user);
    res.redirect(`/oauth-success?token=${token}`);
  }
);

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Please log in using GitHub",
      });
    }

    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;