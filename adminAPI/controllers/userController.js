const User = require("../../database/models/User.model");
const Blog = require("../../database/models/blog.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    async dashboard(req, res) {
        const blogs = await Blog.find({ isDeleted: false });
        return res.render("index", {
            adminSiteUrl: process.env.ADMIN_SITE_URL,
            blogs,
        });
    }
    async loginPage(req, res) {
        return res.render("loginPage", {
            adminSiteUrl: process.env.ADMIN_SITE_URL,
        });
    }
    async registerPage(req, res) {
        return res.render("register", {
            adminSiteUrl: process.env.ADMIN_SITE_URL,
        });
    }
    async adminRegister(req, res) {
        try {
            // const { fullName, email, password } = req.body;
            const fullName = req.body.fullName;
            const email = req.body.email;
            const password = req.body.password;

            const salt = await bcrypt.genSalt(10);
            let user = new User({
                fullName,
                email,
                password: await bcrypt.hash(password, salt),
            });
            await user.save();
            // res.status(200).json({ message: "User registered successfully." });
            res.redirect("/api/log-in");
        } catch (e) {
            console.error(e);
        }
    }
    async adminLogin(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await User.findOne({ email, isDeleted: false });

            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Check if the password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid Password" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "15m",
            });
            // res.status(200).json({ message: "User Login successfully.", token });
            res.redirect("/api");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new UserController();