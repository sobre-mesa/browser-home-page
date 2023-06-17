const Note = require('../models/noteModel');
const { getAll, getOne, updateOne, deleteOne, createOne } = require('./util/index');

exports.getAllNotes = getAll(Note, ['filter', 'sort', 'select', 'pagination']);
exports.getNote  = getOne(Note);
exports.updateNote = updateOne(Note);
exports.deleteNote = deleteOne(Note);
exports.newNote = createOne(Note);
