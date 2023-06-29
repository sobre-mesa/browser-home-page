const Category = require('../models/categoryModel');
const { getAll, getOne, updateOne, deleteOne, createOne } = require('./util/index');

exports.getAllCategories = getAll(Category);
exports.getCategory  = getOne(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
exports.newCategory = createOne(Category);
