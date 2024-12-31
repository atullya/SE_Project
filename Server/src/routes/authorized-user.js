import express from "express";
import {
  addComment,
  changePassword,
  editProfile,
  getBlogById,
  getUploadedBlog,
  incrementViewCount,
  likeBlog,
  removeBlog,
  uploadBlog,
  viewAvailableAllBlog,
  welcomeUser,
} from "../controllers/authUser.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload-middleware.js";
import Blog from "../models/blog.model.js";
const authorizedRoutes = express.Router();

authorizedRoutes.post(
  "/upload",
  authMiddleware, // Ensures only authenticated users can access this route
  uploadMiddleware.array("images", 5), // 'images' is the field name, allowing up to 5 files
  uploadBlog // The controller function handling the upload
);

authorizedRoutes.get("/blogs/:id", authMiddleware, getBlogById);
authorizedRoutes.get("/welcome", authMiddleware, welcomeUser);
authorizedRoutes.get("/uploadedblog", authMiddleware, getUploadedBlog);
authorizedRoutes.get(
  "/viewavailableblog",
  authMiddleware,
  viewAvailableAllBlog
);
authorizedRoutes.get("/inv/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");
    res.json(blog);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

authorizedRoutes.patch(
  "/edit",
  authMiddleware,
  uploadMiddleware.single("image"),
  editProfile
);
authorizedRoutes.patch("/changepassword", authMiddleware, changePassword);

authorizedRoutes.delete("/remove/:id", authMiddleware, removeBlog);

authorizedRoutes.patch("/like/:id", authMiddleware, likeBlog);
authorizedRoutes.patch("/comment/:id", authMiddleware, addComment);
authorizedRoutes.patch("/views/:id", authMiddleware, incrementViewCount);

export default authorizedRoutes;
