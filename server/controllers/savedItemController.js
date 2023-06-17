const SavedItem = require('../models/savedItemModel');
const { getAll, getOne, updateOne, deleteOne, createOne } = require('./util/index');

exports.getAllSavedItems = getAll(SavedItem, ['filter', 'sort', 'select', 'pagination']);
exports.getSavedItem  = getOne(SavedItem);
exports.updateSavedItem = updateOne(SavedItem);
exports.deleteSavedItem = deleteOne(SavedItem);
exports.newSavedItem = createOne(SavedItem);
