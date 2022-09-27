import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost); // if auth says next we can can create post (signIn is correct)
router.put("/:id", auth, updatePost); //patch used for update ,  if auth says next we can can create post (signIn is correct)
router.delete("/:id", auth, deletePost); // if auth says next we can can create post (signIn is correct)
router.patch("/:id/likePost", auth, likePost); // if auth says next we can can create post (signIn is correct)
export default router;
