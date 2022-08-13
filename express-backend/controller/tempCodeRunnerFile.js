const Users = require('../models/users.model');

// exports.createUser = async (req, res) => {
//   // const { email } = req.body;
//   const result = await Users.findOne({ where: { email: req.body.email } });
//   if (result) return res.status(409).json({ error: 'a user with this email already exists' }).end();
//   // const result = await Users.create(req.body)
//   console.log('the results', result);
//   res.end();
// };