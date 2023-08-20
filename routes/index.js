const express = require('express');
const {save} = require("../features/category/controllers/category");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', save);
module.exports = router;
