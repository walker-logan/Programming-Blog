const express = require("express");
const router = express.Router();
const { User } = require("../../models");

const errorHandler = (res, error, statusCode) => {
  console.error(error);
  res.status(statusCode).json({ message: error.message });
};

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    errorHandler(res, error, 500);
  }
});

// create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.name = userData.name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(201).json(userData);
    });
  } catch (error) {
    errorHandler(res, error, 400);
  }
});

// this matches login/password to a user and checks if they are valid
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData || !(await userData.checkPassword(req.body.password))) {
      return errorHandler(
        res,
        new Error("Incorrect email or password, please try again"),
        400
      );
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_in = true;

      res.json({ user: userData.name, message: "You are now logged in!" });
    });
  } catch (error) {
    errorHandler(res, error, 400);
  }
});

// this logs out the user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
