const express = require("express");
const connectDB = require("./db/db");
const path = require("path");
const passport = require("passport");
const app = express();
const cors = require("cors");
const tagsRouter = require("./routers/tag.route.js");
const healthRouter=require("./routers/health.route.js");
const mailsend =require("./routers/email.route.js");
const GoogleStrategy =require("passport-google-oauth20").Strategy;
const session=require("express-session");
const GUser = require("./models/GUser.model.js")
const Gauth =require("./routers/gauth.route.js")
app.use(cors());
// Load environment variables from .env file
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON
app.use(express.json());
app.use(
  session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://kernel-hub.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await GUser.findOne({ googleId: profile.id });

        if (!user) {
          user = await new GUser({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          }).save();
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return done(null, { user, token });
      } catch (error) {
        console.error(error);
        return done(error, false);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id); // Save user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await GUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


// Define routes
app.use("/", Gauth);
app.use("/", require("./routers/api"));
app.use("/api/auth", require("./routers/auth.route.js"));
app.use("/api/posts", require("./routers/post.route.js"));
app.use("/api/comments", require("./routers/comment.route.js")); // Comment routes
app.use("/api/auth/admin",require("./routers/admin.route.js"))
// tags routes
app.use("/api/tags", tagsRouter);
// health  routes
app.use("/api", healthRouter);
// test mail
app.use("/api",mailsend);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
