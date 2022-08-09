const router = require('express').Router();
const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect();

router.get('/', (req, res) => {
  const { orderby, filterby } = req.query;
  const q =
    (filterby !== 'undefined' ? ' WHERE done=' + filterby : '') +
    (orderby !== 'undefined' ? ' ORDER BY ' + orderby : '') +
    ';';
  console.log('SELECT * FROM notes' + q);
  db.query('SELECT * FROM notes' + q, (err, rows, fields) => {
    if (err) throw err;
    res.type('application/json').json(rows).end();
  });
});

router.post('/', (req, res) => {
  db.query(`INSERT INTO notes (value, at) VALUES("${req.body.value}", NOW());`, (err) => {
    res.status(err ? 400 : 200).end();
  });
});

router.put('/', (req, res) => {
  const { id, value, type } = req.body;
  const column = type === 'value' ? 'value' : 'done';
  db.query(`UPDATE notes SET ${column}="${value}" WHERE id=${id}`, (err) => {
    res.status(err ? 400 : 200).end();
  });
});

router.delete('/', (req, res) => {
  db.query(`DELETE FROM notes WHERE id="${req.body.id}"`, (err) => {
    res.status(err ? 400 : 200).end();
  });
});

module.exports = router;
