const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = 8000;
console.log('🧘🏻 Attempting to start server ')
console.log('💭')
console.log('💭💭')
console.log('💭💭💭')
console.log('💭💭💭💭')
console.log('💭💭💭💭💭')
app.listen(PORT);

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false

}).then(con => { 
  console.log('☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️')
  console.log(`              `)
  console.log('                 接続 ｃｏｎｎｅｃｔｅｄ 接続  ')
  console.log(`                           port:${PORT}`)
  console.log(`              `)
  console.log(`              `)
  console.log('DATABASE_PATH: ', process.env.DATABASE)
  console.log(`              `)
  console.log('☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️')
  console.log(`              `)
  console.log('                           Services  ')
  console.log(`              `)
  console.log(`              `)
  console.log('savedItems: ');
  console.log('/savedItems')
  console.log('/savedItems/:id: ');
  console.log(`              `)
  console.log('notes:')
  console.log('/notes')
  console.log('/notes/:id: ');
  console.log(`              `)
  console.log('categories:')
  console.log('/categories')
  console.log('/categories/:id: ');
  console.log(`              `)
  console.log('☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️🏛 ☁️☁️ ')
});
  