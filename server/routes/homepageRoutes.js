const express = require('express');

const {getAllSavedItems,
        getSavedItem,
        updateSavedItem,
        deleteSavedItem,
        newSavedItem} = require(`${__dirname}/../controllers/savedItemController.js`);

const {getAllNotes,
        getNote,
        updateNote,
        deleteNote,
        newNote} = require(`${__dirname}/../controllers/noteController.js`);

const {getAllCategories,
        getCategory,
        updateCategory,
        deleteCategory,
        newCategory} = require(`${__dirname}/../controllers/categoryController.js`);

let router = express.Router();
router.route('/savedItems')
    .get(getAllSavedItems)
    .post(newSavedItem)
    
router.route('/savedItems/:id')
    .get(getSavedItem)
    .patch(updateSavedItem)
    .delete(deleteSavedItem)

router.route('/notes')
    .get(getAllNotes)
    .post(newNote)

router.route('/notes/:id')
    .get(getNote)
    .patch(updateNote)
    .delete(deleteNote)

router.route('/categories')
    .get(getAllCategories)
    .post(newCategory)

router.route('/categories/:id')
    .get(getCategory)
    .patch(updateCategory)
    .delete(deleteCategory)
    
module.exports = router;

