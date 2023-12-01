const express = require("express");
const controller = require("../controllers/blog.controller");

const router = express.Router();

router.get("/", controller.getAllBlogs);
router.get("/:id", controller.getBlogById);
router.post("/", controller.createBlog);
router.put("/:id", controller.updateBlogById);
router.delete("/:id", controller.deleteBlogById);

module.exports = router;
