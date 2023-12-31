
const mongoose = require('mongoose');
const rules = require('./util/validationRules');

const schemaName = 'category';
const schema = new mongoose.Schema({
    name: {
        type: String,
        ...rules.required(schemaName, 'title'),
        ...rules.charMinMax(schemaName, 'title', 1, 40)
    },
    user: {
      type: String,
  },
  },
    {
      toJSON: { virtuals: true }, 
      toObject: { virtuals: true } 
    })
  
//const Container = mongoose.model(schemaName, containerSchema);
module.exports = mongoose.model(schemaName, schema);