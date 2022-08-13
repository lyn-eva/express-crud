const Users = require('../models/users.model');

exports.createUser = async (req, res) => {
  const exists = await Users.findOne({ where: { email: req.body.email } });
  if (exists) return res.status(409).json({ error: 'a user with this email already exists' }).end();
  await Users.create(req.body);
  res.json({ msg: 'account created successfully' }).end();
};

// exports.getNotes = async (req, res) => {
//   const { orderby, filterby } = req.query;
//   const options = {
//     order: [orderby ?? 'createdAT'],
//     ...(filterby && { where: { done: filterby } }),
//   };
//   const notes = await Notes.findAll(options);
//   res.type('application/json').json(notes).end();
// };

// exports.createNote = async (req, res) => {
//   await Notes.create({ value: req.body.value });
//   res.end();
// };

// exports.editNote = async (req, res) => {
//   const { id, value, type } = req.body;
//   await Notes.update({ [type]: value }, { where: { id } });
//   res.end();
// };

// exports.deleteNote = async (req, res) => {
//   await Notes.destroy({ where: { id: req.body.id } });
//   res.end();
// };
