const {save} = require("./controllers/category");
const router = require('express').Router();

router.post('/', save)

module.exports = router;
