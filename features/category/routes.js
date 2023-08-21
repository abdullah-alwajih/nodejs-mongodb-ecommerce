const {index, show, save, update, destroy} = require("./controllers/category");
const router = require('express').Router();

router.route('/categories/').get(index).post(save);
router.route('/categories/:id/').get(show).put(update).delete(destroy);

module.exports = router;
