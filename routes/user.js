const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
  .get(userController.rendersignupForm)
  .post(wrapAsync(userController.signup));

router.route("/login")
  .get(userController.renderLoginForm)
  .post(saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), userController.login);

router.get("/logout", userController.logout);

// User profile page
router.get("/users/:id", wrapAsync(async (req, res) => {
  const profileUser = await User.findById(req.params.id);
  if (!profileUser) {
    req.flash("error", "User not found");
    return res.redirect("/listings");
  }
  const userListings = await Listing.find({ owner: profileUser._id });
  res.render("users/profile.ejs", { profileUser, userListings });
}));

// Privacy & Terms static pages
router.get("/privacy", (req, res) => res.render("static/privacy.ejs"));
router.get("/terms", (req, res) => res.render("static/terms.ejs"));

module.exports = router;
