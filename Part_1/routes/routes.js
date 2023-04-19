const express = require("express");
const router = express.Router();

const {
  getBlog,
  addBlog,
  getBlogId,
  deleteBlog,
  updateBlog,
  login
} = require("../controllers/blogs");

router.get("/", getBlog);

router.post("/", addBlog);

router.get("/:id", getBlogId);

router.delete("/:id", deleteBlog);

router.put("/:id", updateBlog);

router.post("/login", login);


module.exports = router;