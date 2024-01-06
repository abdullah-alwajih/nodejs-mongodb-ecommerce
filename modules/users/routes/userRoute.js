const express = require('express');
const router = express.Router(); // Initialize router

const {
  getUsers,
  getUser,
  storeUser,
  updateUser,
  deleteUser
} = require("../manager/controllers/userController");

const {
  showBrandMiddleware,
  saveBrandMiddleware,
  updateBrandMiddleware,
  deleteBrandMiddleware,
} = require("./brandMiddleware");


// Define routes and use middleware
router.route('/')
  .get(getUsers)
  .post(saveBrandMiddleware, storeUser);

router.route('/:id')
  .get(showBrandMiddleware, getUser)
  .put(updateBrandMiddleware, updateUser)
  .delete(deleteBrandMiddleware, deleteUser);

module.exports = router; // Export the router
