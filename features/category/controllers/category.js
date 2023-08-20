const CategoryModel = require("../models/category");

exports.save = (req, res) => {
  const name = req.body.name;
  const category = new CategoryModel({name});
  category.save().then((doc) => {
    res.json(doc);
  }).catch((err) => {
    res.json(err);
  });
}





