const userRepo = require("../repositories/user.repository");
const blogRepo = require("../repositories/blog.repository");

module.exports.createBlog = async (title, blogContent, loggedInUserId) => {
    console.log("abc");
    const user = await userRepo.getUserById(loggedInUserId);

    if (!user) {
        const error = new Error("User Id is not valid.");
        error.message = "User Id is not valid.";
        error.status = 400;
        throw error;
    }

    return await blogRepo.createBlog({ title, blogContent, loggedInUserId });
};

module.exports.getAllBlogs = async (contentType) => {
    const blogResponse = await blogRepo.getAllBlogs();
    const blogList = blogResponse.map((e) => e.dataValues);

    return blogList;
};

module.exports.getBlogById = async (id, contentType) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    return blog;
};

module.exports.updateBlogById = async (id, title, blogContent, loggedInUserId) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blog not found.";
        error.status = 404;
        throw error;
    }

    return await blogRepo.updateBlogById(blog, { title, blogContent, userId: loggedInUserId });
};

module.exports.deleteBlogById = async (id, loggedInUserId) => {
    const blog = await blogRepo.getBlogById(id);
    if (!blog) {
        const error = new Error("Blog not found.");
        error.message = "Blogg not found.";
        error.status = 404;
        throw error;
    }

    return await blogRepo.deleteBlogById(blog);
};
