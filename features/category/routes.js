const router = require('express').Router();
const {index, show, save, update, destroy} = require("./controllers/category");
const {
  showCategoryMiddleware, saveCategoryMiddleware, updateCategoryMiddleware, deleteCategoryMiddleware,
} = require("./validators/middlewares");


router.route('/categories/').get(index)
    .post(saveCategoryMiddleware, save);

router.route('/categories/:id/')
    .get(showCategoryMiddleware, show)
    .put(updateCategoryMiddleware, update)
    .delete(deleteCategoryMiddleware, destroy);

module.exports = router;
