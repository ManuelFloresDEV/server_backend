const express = require("express");

const postUseCase = require("../usecases/post.usecases");
const auth = require("../middleware/auth");
const createError = require("http-errors");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.tags) throw createError(400, "tags is required");
    const user = req.user;

    const post = await postUseCase.createPost({
      ...data,
      user: user._id,
      tags: data.tags.trim().split(" "),
    });
    res.json({
      success: true,
      message: "post created",
      data: { post: post },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const search = req.query.search;

    const posts = search
      ? await postUseCase.getByTitle(search.trim())
      : await postUseCase.getAllPost();

    res.json({
      success: true,
      message: search ? "Posts found by title" : "All posts",
      data: { posts: posts },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    if (newData.user) throw createError(400, "The user is not changed");

    if (Object.keys(newData).length === 0)
      throw createError(404, "There is no data to update");

    const updatePost = await postUseCase.updateById(id, newData);
    res.json({
      success: true,
      message: "post updated",
      data: { post: updatePost },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const deletePost = await postUseCase.deleteById(id, user._id);
    res.json({
      success: true,
      message: "post Deleted",
      data: { Post: deletePost, id: id },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id/comments", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { comment } = req.body;
    const user = req.user;

    const newComment = {
      user: user._id,
      comment,
    };

    const addComment = await postUseCase.addComments(id, newComment);

    res.json({
      success: true,
      message: "add comment",
      data: { comments: addComment },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id/reactions", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { reaction } = req.body;

    if (!reaction) {
      throw createError(400, "reaction is required in request body");
    }

    const user = req.user;

    const addReaction = await postUseCase.addReactions(id, reaction, user._id);

    res.json({
      succes: true,
      message: "add reaction",
      data: { reactions: addReaction },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
