const { Model, DataTypes } = require('sequelize');
const db = require('./db');
const Notes = require('./notes.model');

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
Users.hasMany(Notes, { foreignKey: 'uid', sourceKey: 'uid' });
module.exports = Users;
