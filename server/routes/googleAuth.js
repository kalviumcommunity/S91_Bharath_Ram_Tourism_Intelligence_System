// // Add this to your existing auth routes file (routes/auth.js), or keep it
// // separate and mount it in server.js with:
// //   app.use("/api/auth", require("./routes/googleAuth"));

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const User = require("../models/User");

// const router = express.Router();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // POST /api/auth/google
// // Body: { credential }  <-- the ID token string from Google's button
// router.post("/google", async (req, res) => {
//   const { credential } = req.body;

//   if (!credential) {
//     return res.status(400).json({ message: "Missing Google credential." });
//   }

//   try {
//     // Verifies the signature, audience and expiry server-side.
//     // Never trust a decoded-but-unverified token.
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { sub: googleId, email, name, email_verified } = payload;

//     if (!email_verified) {
//       return res.status(401).json({ message: "Google email not verified." });
//     }

//     // Match an existing account by googleId first, then by email
//     // (covers a user who registered locally with the same email before).
//     let user = await User.findOne({ $or: [{ googleId }, { email }] });

//     if (user) {
//       if (!user.googleId) {
//         user.googleId = googleId;
//         user.authProvider = user.authProvider === "local" ? user.authProvider : "google";
//         await user.save();
//       }
//     } else {
//       // Build a username from the email, and de-dupe if it's taken.
//       let baseUsername = email.split("@")[0];
//       let username = baseUsername;
//       let suffix = 1;
//       while (await User.findOne({ username })) {
//         username = `${baseUsername}${suffix++}`;
//       }

//       user = await User.create({
//         username,
//         email,
//         googleId,
//         authProvider: "google",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" } // match whatever expiry your local login uses
//     );

//     res.json({
//       token,
//       user: { id: user._id, username: user.username, email: user.email },
//     });
//   } catch (error) {
//     console.error("Google auth error:", error.message);
//     console.error(error);
//     res.status(401).json({ message: "Google sign-in failed." });
//   }
// });

// module.exports = router;



const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const googleAuth = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({
      message: "Missing Google credential.",
    });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(401).json({
        message: "Google email is not verified.",
      });
    }

    let user = await User.findOne({
      $or: [
        { googleId: googleId },
        { email: email },
      ],
    });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        await user.save();
      }
    } else {
      let baseUsername = email.split("@")[0];
      let username = baseUsername;
      let suffix = 1;

      while (await User.findOne({ username })) {
        username = `${baseUsername}${suffix}`;
        suffix++;
      }

      user = await User.create({
        username,
        email,
        googleId,
        authProvider: "google",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Google authentication error:");
    console.error(error);

    res.status(401).json({
      message: "Google sign-in failed.",
      error: error.message,
    });
  }
};

module.exports = googleAuth;