
const rules = require('./util/validationRules');
const mongoose = require('mongoose');

const schemaName = 'note';
const schema = new mongoose.Schema({
    title: {
        type: String,
        ...rules.required(schemaName, 'title'),
        ...rules.charMinMax(schemaName, 'title', 1, 40)
    },
    content: {
      type: String,
      ...rules.required(schemaName, 'content'),
      ...rules.charMinMax(schemaName, 'content', 1, 300)
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
  },
    {
      toJSON: { virtuals: true }, 
      toObject: { virtuals: true } 
    })
  
//const Container = mongoose.model(schemaName, containerSchema);
module.exports = mongoose.model(schemaName, schema);