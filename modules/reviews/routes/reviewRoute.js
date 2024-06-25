const express = require('express');

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('./reviewMiddleware');

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require('../manager/controllers/reviews');

const {authenticated, authenticateAndAuthorize} = require('../../../core/middlewares/authMiddleware');

const router = express.Router({mergeParams: true});

router
  .route('/')
  .get(createFilterObj, getReviews)
  .post(
    authenticateAndAuthorize('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(
    authenticateAndAuthorize('user'),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authenticateAndAuthorize('user', 'manager', 'admin'),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
