import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Vehicle = sequelize.define('Vehicle', {
  number_plate: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('available','in_use'), defaultValue: 'available' }
});
