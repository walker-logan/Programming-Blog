const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

const errorHandler = (res, error, statusCode) => {
  console.error(error);
  res.status(statusCode).json({ message: error.message });
};

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    res.status(200).json(posts);
  } catch (error) {
    errorHandler(res, error, 500);
  }
});

// create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    errorHandler(res, error, 400);
  }
});

// delete a specific post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      return errorHandler(res, new Error("No post found with this ID"), 404);
    }

    res.status(204).end();
  } catch (error) {
    errorHandler(res, error, 500);
  }
});

module.exports = router;
