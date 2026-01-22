const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const githubId = profile.id;
      const email = profile.emails[0].value;
      const username = profile.username;

      const githubUser = await User.findOne({ githubId: githubId });

      if (githubUser) {
        return done(null, githubUser);
      }

      const emailUser = await User.findOne({ email: email });

      if (emailUser) {
        emailUser.githubId = githubId;
        await emailUser.save();
        return done(null, emailUser);
      }

      const newUser = new User({
        githubId: githubId,
        email: email,
        username: username,
      });

      await newUser.save();
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});