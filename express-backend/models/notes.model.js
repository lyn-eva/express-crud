const { Model, DataTypes } = require('sequelize');
const db = require('./db');

class Notes extends Model {}

Notes.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: { type: DataTypes.STRING, allowNull: false },
    done: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    uid: { type: DataTypes.UUID, references: { model: 'users', key: 'uid' } },
  },
  { sequelize: db, modelName: 'notes' }
);
module.exports = Notes;
