const express = require("express");
const app = express();

const path = require("path");
const engine = require("ejs-locals");
const bodyParser = require("body-parser");

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("debug", process.env.NODE_ENV === "development");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use((req, res, next) => {
    res.success = (data, message) => {
        // console.log(data)
        res.status(200).json({
            success: true,
            data,
            message,
        });
    };
    res.error = (data, message) => {
        // console.log(data)
        res.status(200).json({
            success: false,
            data,
            message,
        });
    };
    res.warn = (data, message) => {
        // console.log(data)
        res.status(200).json({
            success: false,
            data,
            message,
        });
    };
    next();
});

const port = process.env.ADMIN_PORT;
const connectDB = require("./database/db");
app.get("/", (req, res) => {
    res.send("Welcome to Admin dashboard!!");
});
app.use("/api", require("./adminAPI/routes/apiRoutes"));

const http = require("http");
server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));