const Blog = require("../../database/models/blog.model");

class PageController {
    async homePage(req, res) {
        return res.render("home", { siteUrl: process.env.SITE_URL });
    }
    async blogPage(req, res) {
        const blogs = await Blog.find({ isDeleted: false });
        return res.render("blog", {
            siteUrl: process.env.SITE_URL,
            blogs,
        });
    }
}

module.exports = new PageController();