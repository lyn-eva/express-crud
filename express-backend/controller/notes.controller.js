const Notes = require('../models/notes.model');

exports.getNotes = async (req, res) => {
  const { orderby, filterby } = req.query;
  const options = {
    order: [orderby ?? 'createdAT'],
    where: { ...(filterby && { done: filterby }), uid: req.session.user.uid },
  };
  const notes = await Notes.findAll(options);
  res.type('application/json').json(notes).end();
};

exports.createNote = async (req, res) => {
  await Notes.create({ value: req.body.value, uid: req.session.user.uid });
  res.end();
};

exports.editNote = async (req, res) => {
  const { id, value, type } = req.body;
  await Notes.update({ [type]: value }, { where: { id } });
  res.end();
};

exports.deleteNote = async (req, res) => {
  await Notes.destroy({ where: { id: req.body.id } });
  res.end();
};
