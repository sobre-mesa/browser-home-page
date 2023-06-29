const Category = require('../models/categoryModel');
const { getAll, getOne, updateOne, deleteOne, createOne, deleteAll } = require('./util/index');
const {deleteAllInCategory} = require('./savedItemController');

exports.getAllCategories = getAll(Category);
exports.getCategory  = getOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = (req, res) => {
    deleteOne(Category)(req, res);
    deleteAllInCategory(req.params.id);
}
exports.newCategory = createOne(Category);
