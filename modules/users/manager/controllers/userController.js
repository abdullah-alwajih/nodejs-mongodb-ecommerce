const controller = require("../../../../core/base/controllers/controller");
const User = require("../../data/models/userModel");

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = controller.index(User, ['name', 'slug']);

// @desc    Get specific users by id
// @route   GET /api/v1/users/:id
// @access  Public
exports.getUser = controller.show(User);

// @desc    Create users
// @route   POST  /api/v1/users
// @access  Private
exports.storeUser = controller.store(User);

// @desc    Update specific users
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = controller.update(User);

// @desc    Delete specific users
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = controller.delete(User);