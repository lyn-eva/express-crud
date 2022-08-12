require('dotenv').config();
const app = require('express')();
const parser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const notesRouter = require('./routes/notes.route');
const db = require('./models/db');

const main = async () => {
  await db.sync();
  app.listen(process.env.PORT || 5000);

  app.use(cors(corOptions));
  app.use(parser.json());
  app.use(session(sessionOptions));

  // http handlers
  app.use('/api/notes', notesRouter);
};
main();

// app.use((req, res) => res.json({ name: 'Your Name', japanese: 'Kimi no Na Wa', year: 2016 }));
const sessionOptions = {
  name: 'express-crud-sid',
  resave: false,
  saveUninitialized: false,
  secret: 'end of evangelion',
  store: new SequelizeStore({ db }),
};

const corOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
  credentials: true,
};
