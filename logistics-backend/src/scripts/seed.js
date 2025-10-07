// simple seeder to create sample users and vehicles
import bcrypt from 'bcrypt';
import { sequelize } from './config/db.js';
import { User } from './models/user.model.js';
import { Vehicle } from './models/vehicle.model.js';
import { Delivery } from './models/delivery.model.js';

const seed = async () => {
  await sequelize.sync({ force: true });
  const hash = await bcrypt.hash('password', 10);

  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: hash, role: 'Admin' });
  const driver1 = await User.create({ name: 'Driver One', email: 'driver1@example.com', password: hash, role: 'Driver' });
  const driver2 = await User.create({ name: 'Driver Two', email: 'driver2@example.com', password: hash, role: 'Driver' });
  const customer = await User.create({ name: 'Customer', email: 'customer@example.com', password: hash, role: 'Customer' });

  const v1 = await Vehicle.create({ number_plate: 'KA01AB1234', model: 'Van' });
  const v2 = await Vehicle.create({ number_plate: 'KA02CD5678', model: 'Truck' });

  // sample delivery
  const d1 = await Delivery.create({
    pickup_location: 'Warehouse A',
    drop_location: 'Shop 1',
    driver_id: driver1.id,
    vehicle_id: v1.id,
    customer_id: customer.id,
    start_time: new Date(),
    end_time: new Date(Date.now() + 1000 * 60 * 30) // +30 mins
  });

  console.log('Seed complete. Admin login: admin@example.com / password');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
