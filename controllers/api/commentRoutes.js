const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

const errorHandler = (res, error, statusCode) => {
  console.error(error);
  res.status(statusCode).json({ message: error.message });
};

// get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({});
    res.status(200).json(comments);
  } catch (error) {
    errorHandler(res, error, 500);
  }
});

// create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    if (req.session) {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
      res.status(201).json(newComment);
    } else {
      res.status(400).json({ message: "Please log in to post a comment..." });
    }
  } catch (error) {
    errorHandler(res, error, 400);
  }
});

// delete a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return errorHandler(
        res,
        new Error("No comment found with this ID..."),
        404
      );
    }
    // checks if logged in user owns the comment
    if (req.session.user_id !== comment.user_id) {
      return errorHandler(
        res,
        new Error("You do not have permission to delete this comment..."),
        403
      );
    }
    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    errorHandler(res, error, 500);
  }
});

module.exports = router;
