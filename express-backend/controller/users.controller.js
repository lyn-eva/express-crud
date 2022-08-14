const Users = require('../models/users.model');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const exists = await Users.findOne({ where: { email: req.body.email } });
  if (exists) return res.status(409).json({ error: 'a user with this email already exists' }).end();
  const password = await bcrypt.hash(req.body.password, 11);
  await Users.create({ ...req.body, password });
  req.session.user = { loggedIn: true };
  res.json({ msg: 'account created successfully' }).end();
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne(findUserQuery(email));
  if (!user) return res.status(409).json({ error: 'no account is created with this email' }).end();
  const authentic = await bcrypt.compare(password, user.dataValues.hashedPwd);
  if (!authentic) return res.status(401).json({ error: 'incorrect password' }).end();
  req.session.user = { loggedIn: true };
  res.json({ msg: 'successfully logged in' }).end();
};

exports.logoutUser = async (req, res) => {
  await req.session.destroy();
  res.clearCookie('express-crud-sid').json({ msg: 'successfully logged out' }).end();
};

exports.getUserInfo = (req, res) => {
  res.json({ ...req.session.user }).end();
};

const findUserQuery = (email) => ({
  attributes: [['password', 'hashedPwd']],
  where: { email },
});
