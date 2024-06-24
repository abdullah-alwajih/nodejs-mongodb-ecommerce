const express = require('express');

const {
  authenticated,
  authorized,
} = require("../../../core/middlewares/authMiddleware");

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../manager/controllers/addressController');

const router = express.Router();

router.use(authenticateAndAuthorize('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;
