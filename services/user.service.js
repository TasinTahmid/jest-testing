const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");

module.exports.register = async (username, email, password) => {
    const userByUsername = await userRepo.getUserByUsername(username);

    if (userByUsername) {
        const error = new Error("User already exists by this username.");
        error.message = "User already exists by this username.";
        error.status = 400;
        throw error;
    }

    const userByEmail = await userRepo.getUserByEmail(email);

    if (userByEmail) {
        const error = new Error("User already existsby this email.");
        error.message = "User already exists by this email.";
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepo.createUser(username, email, hashPassword);

    return createToken(newUser.id);
};

module.exports.login = async (email, password) => {
    const user = await userRepo.getUserByEmail(email);

    if (!user) {
        const error = new Error("User not found.");
        error.message = "User not found.";
        error.status = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.message = "Invalid credentials";
        error.status = 400;
        throw error;
    }

    return createToken(user.id);
};

module.exports.updateUserById = async (id, loggedInUserId, oldPassword, newPassword) => {
    const user = await userRepo.getUserById(id);
    if (!user) {
        const error = new Error("User not found.");
        error.message = "User not found.";
        error.status = 404;
        throw error;
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.message = "Invalid credentials";
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    return await userRepo.updateUserById(user, hashPassword);
};

module.exports.deleteUserById = async (id, loggedInUserId) => {
    const user = await userRepo.getUserById(id);
    if (!user) {
        const error = new Error("User not found.");
        error.message = "User not found.";
        error.status = 404;
        throw error;
    }

    return await userRepo.deleteUserById(user);
};
