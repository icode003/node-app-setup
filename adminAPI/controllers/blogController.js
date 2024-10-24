const Blog = require("../../database/models/blog.model");

class BlogController {
    async blogPage(req, res) {
        return res.render("blogs/blogPage", {
            adminSiteUrl: process.env.ADMIN_SITE_URL,
        });
    }
    async addBlog(req, res) {
        return res.render("blogs/addBlog", {
            adminSiteUrl: process.env.ADMIN_SITE_URL,
        });
    }

    async addBlogSave(req, res) {
        try {
            const title = req.body.title;
            const description = req.body.description;

            const blogSave = new Blog({
                title,
                description,
            });
            await blogSave.save();
            // res.status(200).json({ message: "Blog Saved successfully." });
            res.redirect("/api");
        } catch (e) {
            console.error(e);
        }
    }

    async editBlog(req, res) {
        try {
            const _id = req.query.blogId;

            if (!_id) {
                return res.status(400).json({ message: "Blog ID is required" });
            }

            let blog = await Blog.findOne({ _id, isDeleted: false });

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            res.render("blogs/edit-blog", {
                blog,
                adminSiteUrl: process.env.ADMIN_SITE_URL,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async editBlogSave(req, res) {
        try {
            const _id = req.query.blogId;

            if (!_id) {
                return res.status(400).json({ message: "Blog ID is Not Found!" });
            }

            let blog = await Blog.findOne({ _id, isDeleted: false });
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            blog.title = req.body.title;
            blog.description = req.body.description;

            // Save the updated blog post back to the database
            await blog.save();

            // res.status(200).json({ message: "Blog edited successfully." });
            res.redirect("/api");
        } catch (e) {
            console.error(e);
        }
    }

    async deleteBLog(req, res) {
        try {
            const _id = req.query.blogId;

            let blog = await Blog.findOne({ _id, isDeleted: false });
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            res.status(200).json({ message: "Blog Deleted successfully!!!!!!" });
            // res.redirect("/blogs/edit-blog");
        } catch (e) {
            console.error(e);
        }
    }

    async deleteBLogSave(req, res) {
        try {
            const _id = req.query.blogId;

            let blog = await Blog.findOne({ _id, isDeleted: false });
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            blog.isDeleted = true;
            await blog.save();
            // res.status(200).json({ message: "Blog Deleted successfully." });
            res.redirect("/api");
        } catch (e) {
            console.error(e);
        }
    }

    async viewBlogs(req, res) {
        try {
            const blogs = await Blog.find({ isDeleted: false });
            res
                .status(200)
                .json({ message: "Blog Saved successfully.", data: blogs });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new BlogController();