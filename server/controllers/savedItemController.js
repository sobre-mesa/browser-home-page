const SavedItem = require('../models/savedItemModel');
const { getAll, getOne, updateOne, deleteOne, createOne, getAllForUser } = require('./util/index');

exports.deleteAllInCategory = (categoryId) => {
    SavedItem.deleteMany({ category: categoryId }, (err) => {
      if (err) {
        console.error('Error deleting SavedItems:', err);
      } else {
        console.log(categoryId);
        console.log('SavedItems deleted successfully.');
        return {status: 'Success'}
      }
    });
  };

exports.getAllSavedItems = getAll(SavedItem);
exports.getSavedItem  = getOne(SavedItem);
exports.updateSavedItem = updateOne(SavedItem);
exports.deleteSavedItem = deleteOne(SavedItem);
exports.newSavedItem = createOne(SavedItem);
exports.getAllItemsForUser = getAllForUser(SavedItem);