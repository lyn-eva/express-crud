const { Model, DataTypes } = require('sequelize');
const db = require('./db');

class Users extends Model {}

Model.init(
  {
    uid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    lastLoggedIn: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize: db, modelName: 'users' }
);
module.exports = Users;
