const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// post belongs to user
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// user has many posts
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
// comment belongs to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
