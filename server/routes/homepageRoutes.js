const express = require('express');

const {getAllSavedItems,
        getSavedItem,
        updateSavedItem,
        deleteSavedItem,
        newSavedItem,
        getAllItemsForUser} = require(`${__dirname}/../controllers/savedItemController.js`);

const {getAllCategories,
        getCategory,
        updateCategory,
        deleteCategory,
        newCategory,
        getAllCategoriesForUser } = require(`${__dirname}/../controllers/categoryController.js`);

let router = express.Router();

router.route('/savedItems')
    .post(newSavedItem)
router.route('/savedItems/user/:user')
    .get(getAllItemsForUser)
router.route('/savedItems/:id')
    .get(getSavedItem)
    .patch(updateSavedItem)
    .delete(deleteSavedItem)

router.route('/categories')
    .get(getAllCategories)
    .post(newCategory)
router.route('/categories/user/:user')
    .get(getAllCategoriesForUser)
router.route('/categories/:id')
    .get(getCategory)
    .patch(updateCategory)
    .delete(deleteCategory)
    
module.exports = router;

