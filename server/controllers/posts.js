import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = req.body;

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatePost);
  } catch (error) {
    res.send(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const deletePost = await PostMessage.findByIdAndRemove(id);
    res.status(200).json(deletePost);
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId)); // already liked

    if (index === -1) {
      //like the post
      post.likes.push(req.userId);
    } else {
      //dislike a post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
