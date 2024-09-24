const Post = require("../model/post.model");
const createError = require("http-errors");

async function createPost(data) {
  if (data.tags.length > 4) throw createError(400, "only 4 tags are allowed");
  if (!data.title) throw createError(400, "title is required");
  if (!data.image) throw createError(400, "image is required");
  if (!data.body) throw createError(400, "body is required");

  const newPost = (await Post.create(data)).populate("user");

  return newPost;
}
async function getAllPost() {
  const posts = await Post.find({})
    .populate("user")
    .populate("comments.user")
    .populate("reactions.users");
  return posts;
}

async function getByTitle(title) {
  const regexTitle = new RegExp(title, "i");
  const posts = await Post.find({ title: regexTitle })
    .populate("user")
    .populate("comments.user")
    .populate("reactions.users");

  if (posts.length === 0) throw createError(404, "no matches found");

  return posts;
}

async function updateById(id, newData) {
  const postFound = await Post.findById(id);
  if (!postFound) throw createError(404, "post not found");

  newData.user = postFound.user;
  if (newData.tags) newData.tags.trim().split(" ");

  const post = await Post.findByIdAndUpdate(id, newData, { new: true });

  return post;
}

async function deleteById(idPost, userId) {
  const findPost = await Post.findById(idPost);
  if (!findPost) throw createError(404, "post not found");

  if (findPost.user.toString() !== userId.toString())
    throw createError(403, "You don't have permission to delete this post.");

  const deletePost = await Post.findByIdAndDelete(idPost);

  return deletePost;
}

async function addComments(postId, commentData) {
  const findPost = await Post.findById(postId);
  if (!findPost) throw createError(404, "post not found");

  if (!findPost.comments) {
    findPost.comments = [];
  }

  findPost.comments.push(commentData);

  await findPost.save();

  return findPost.comments;
}

async function addReactions(postId, emoji, userId) {
  const findPost = await Post.findById(postId);
  if (!findPost) {
    throw createError(404, "post not found");
  }

  const reactionIndex = findPost.reactions.findIndex(
    (reaction) => reaction.reaction === emoji
  );

  if (reactionIndex !== -1) {
    const userAlreadyReaction =
      findPost.reactions[reactionIndex].users.includes(userId);

    if (userAlreadyReaction) {
      throw createError(409, "user has already reacted with this emoji");
    } else {
      findPost.reactions[reactionIndex].users.push(userId);
      findPost.reactions[reactionIndex].count += 1;
    }
  } else {
    findPost.reactions.push({
      reaction: emoji,
      count: 1,
      users: [userId],
    });
  }

  await findPost.save();

  return findPost.reactions;
}

module.exports = {
  addReactions,
  addComments,
  createPost,
  getByTitle,
  updateById,
  deleteById,
  getAllPost,
};
