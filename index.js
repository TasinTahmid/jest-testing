const express = require("express");
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    req.loggedInUserId = "c02e43c9-0786-44db-8089-2355cccf5850";
    next();
});

app.get("/", (req, res) => {
    res.send("Your blog server is working...");
});

app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(5000, () => {
    console.log("Listening on port 5000.");
});
