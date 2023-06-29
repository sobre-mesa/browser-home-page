const SavedItem = require('../models/savedItemModel');
const { getAll, getOne, updateOne, deleteOne, createOne } = require('./util/index');

exports.deleteAllInCategory = (categoryId) => {
    SavedItem.deleteMany({ category: categoryId }, (err) => {
      if (err) {
        console.error('Error deleting SavedItems:', err);
      } else {
        console.log('SavedItems deleted successfully.');
      }
    });
  };

exports.getAllSavedItems = getAll(SavedItem);
exports.getSavedItem  = getOne(SavedItem);
exports.updateSavedItem = updateOne(SavedItem);
exports.deleteSavedItem = deleteOne(SavedItem);
exports.newSavedItem = createOne(SavedItem);
