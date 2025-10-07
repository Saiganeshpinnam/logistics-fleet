import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './user.model.js';
import { Vehicle } from './vehicle.model.js';

export const Delivery = sequelize.define('Delivery', {
  pickup_location: { type: DataTypes.STRING, allowNull: false },
  drop_location: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('pending','on_route','delivered'), defaultValue: 'pending' },
  start_time: { type: DataTypes.DATE, allowNull: true },
  end_time: { type: DataTypes.DATE, allowNull: true }
});

Delivery.belongsTo(User, { as: 'driver', foreignKey: 'driver_id' });
Delivery.belongsTo(User, { as: 'customer', foreignKey: 'customer_id' });
Delivery.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });
