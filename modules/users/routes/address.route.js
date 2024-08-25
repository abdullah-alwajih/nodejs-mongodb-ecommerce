const express = require('express');

const {
  authenticateAndAuthorize,
} = require("../../../core/middlewares/authMiddleware");

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../manager/controllers/address.controller');

const router = express.Router();

router.use(authenticateAndAuthorize('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;
