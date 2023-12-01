const blogService = require("../services/blog.service");

module.exports.createBlog = async (req, res, next) => {
    try {
        console.log(req.body);
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        console.log(title, blogContent, loggedInUserId);
        const createdBlog = await blogService.createBlog(title, blogContent, loggedInUserId);

        return res.status(201).send(createdBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.getAllBlogs = async (req, res, next) => {
    try {
        const contentType = res.get("Content-Type");

        const blogList = await blogService.getAllBlogs(contentType);

        return res.status(200).send(blogList);
    } catch (error) {
        return next(error);
    }
};

module.exports.getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const contentType = res.get("Content-Type");

        const blog = await blogService.getBlogById(id, contentType);

        return res.status(200).send(blog);
    } catch (error) {
        return next(error);
    }
};

module.exports.updateBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, blogContent } = req.body;
        const loggedInUserId = req.loggedInUserId;

        const updatedBlog = await blogService.updateBlogById(
            id,
            title,
            blogContent,
            loggedInUserId
        );

        return res.status(200).send(updatedBlog);
    } catch (error) {
        return next(error);
    }
};

module.exports.deleteBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.loggedInUserId;

        const deletedBlog = await blogService.deleteBlogById(id, loggedInUserId);

        return res.status(200).send(deletedBlog);
    } catch (error) {
        return next(error);
    }
};
