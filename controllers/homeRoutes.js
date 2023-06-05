const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get homepage
router.get("/", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const postData = await Post.findAll({
        include: [User],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    } else {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// get signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
