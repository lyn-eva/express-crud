require('dotenv').config();
const app = require('express')();
const parser = require('body-parser');
const cors = require('cors');

const notesRouter = require('./routes/notes.route');
const db= require('./models/db');

const main = async () => {
  await db.sync();
  app.listen(process.env.PORT || 5000);
  
  app.use(cors());
  app.use(parser.json());
  
  // http handlers
  app.use('/api/notes', notesRouter);
};
main();

// app.use((req, res) => res.json({ name: 'Your Name', japanese: 'Kimi no Na Wa', year: 2016 }));