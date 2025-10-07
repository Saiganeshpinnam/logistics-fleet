import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Delivery } from './delivery.model.js';

export const Tracking = sequelize.define('Tracking', {
  latitude: { type: DataTypes.FLOAT, allowNull: false },
  longitude: { type: DataTypes.FLOAT, allowNull: false }
});

Tracking.belongsTo(Delivery, { foreignKey: 'delivery_id' });
