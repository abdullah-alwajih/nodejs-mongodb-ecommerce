const express = require('express');
const {authenticated, authenticateAndAuthorize} = require("../../../core/middlewares/authMiddleware");


const {
  showUserMiddleware,
  createUserMiddleware,
  updateUserMiddleware,
  deleteUserMiddleware,
  changeUserPasswordMiddleware,
  updateLoggedUserMiddleware,
} = require('./user.middleware');

const {
  getUsers,
  getUser,
  storeUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require('../manager/controllers/user.controller');


const router = express.Router();

router.use(authenticated);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserMiddleware, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

// Admin
router.use(authenticateAndAuthorize('admin', 'manager'));
router.put('/changePassword/:id', changeUserPasswordMiddleware, changeUserPassword);
router
  .route('/')
  .get(getUsers)
  .post(createUserMiddleware, storeUser);
router
  .route('/:id')
  .get(showUserMiddleware, getUser)
  .put(updateUserMiddleware, updateUser)
  .delete(deleteUserMiddleware, deleteUser);

module.exports = router;
