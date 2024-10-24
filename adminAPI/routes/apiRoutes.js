const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const BlogController = require("../controllers/blogController");

// User API's
router.get("/", UserController.dashboard);
router.get("/log-in", UserController.loginPage);
router.get("/register", UserController.registerPage);
router.post("/register", UserController.adminRegister);
router.post("/log-in", UserController.adminLogin);

// Blog API's
router.get("/blog-page", BlogController.blogPage);
router.get("/add-blog", BlogController.addBlog);
router.post("/add-blog", BlogController.addBlogSave);
router.get("/edit-blog", BlogController.editBlog);
router.post("/edit-blog", BlogController.editBlogSave);
router.get("/delete-blog", BlogController.deleteBLog);
router.post("/delete-blog", BlogController.deleteBLogSave);
router.get("/view-blog", BlogController.viewBlogs);
module.exports = router;