const controller = require("../../controllers/blog.controller");
const blogService = require("../../services/blog.service");
// jest.mock("../../services/blog.service");

const req = {
    body: {
        title: "test blog",
        blogContent: "test content.",
    },
    loggedInUserId: "c02e43c9-0786-44db-8089-2355cccf5850",
};

const res = {
    status: jest.fn(),
    send: jest.fn(),
};

const next = jest.fn();

const mockCreatedBlog = {
    title: "test blog",
    blogContent: "test content.",
    userId: "c02e43c9-0786-44db-8089-2355cccf5850",
};

it("should send a status code of 201 after creating blog", async () => {
    // blogService.createBlog.mockResolvedValue(mockCreatedBlog);
    jest.spyOn(blogService, "createBlog").mockResolvedValue(mockCreatedBlog);

    const ans = await controller.createBlog(req, res, next);
    console.log(ans);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockCreatedBlog);
    expect(next).not.toHaveBeenCalled();
});
