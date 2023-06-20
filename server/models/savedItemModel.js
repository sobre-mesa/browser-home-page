const rules = require('./util/validationRules');
const mongoose = require('mongoose');

const schemaName = 'savedItem';
const schema = new mongoose.Schema({
    url: {
        type: String,
        ...rules.required(schemaName, 'url'),
        ...rules.charMinMax(schemaName, 'url', 1, 2048)
    },
    description: {
      type: String,
      ...rules.charMinMax(schemaName, 'description', 1, 40)
    },
    category: {
        type: String,
        ...rules.required(schemaName, 'category'),
        ...rules.charMinMax(schemaName, 'category', 1, 40),
        trim: true,
    },
    image: {
        type: String,
        trim: true,
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