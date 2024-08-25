const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('./authMiddleware');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../manager/controllers/authController');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyPassResetCode);
router.put('/reset-password', resetPassword);

module.exports = router;
