const Blog = require("../models/blog.model");

module.exports.createBlog = async (blogData) => {
    const blog = await Blog.create(blogData);
    return blog;
};

module.exports.getAllBlogs = async () => {
    return await Blog.findAll();
};

module.exports.getBlogById = async (id) => {
    return await Blog.findOne({ where: { id } });
};

module.exports.updateBlogById = async (blog, blogData) => {
    return await blog.update(blogData);
};
module.exports.deleteBlogById = async (blog) => {
    return await blog.destroy();
};

module.exports.countNumberOfBlogs = async () => {
    return await Blog.count();
};
