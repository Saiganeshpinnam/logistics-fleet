import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Admin','Driver','Customer'), allowNull: false }
});

// {
//     "name": "ganesh",
//     "email": "ganesh@gmail.com",
//     "password": "1234",
//     "role": "Admin"
// }

// {
//     "name": "Sai",
//     "email": "Sai@gmail.com",
//     "password": "1234",
//     "role": "Customer"
// }


// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwibmFtZSI6ImdhbmVzaCIsImlhdCI6MTc1OTgyMDM4MCwiZXhwIjoxNzU5ODQ5MTgwfQ.A1ZkLCftttaixSLnN0Rs2RSJyXpxxAETFJgnQxkl0Vc",
//     "user": {
//         "id": 5,
//         "name": "ganesh",
//         "email": "ganesh@gmail.com",
//         "role": "Admin"
//     }
// }


// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6IkN1c3RvbWVyIiwibmFtZSI6IlNhaSIsImlhdCI6MTc1OTgxOTUzMSwiZXhwIjoxNzU5ODQ4MzMxfQ.Q3t7ywEPSRCuW1SKbnmLEKzS8Y0n_i7J_eKGy9shOh0",
//     "user": {
//         "id": 6,
//         "name": "Sai",
//         "email": "Sai@gmail.com",
//         "role": "Customer"
//     }
// }


// Add a vechicle
// {
//     "status": "available",
//     "id": 1,
//     "number_plate": "MH12AB1234",
//     "model": "Tata Ace",
//     "updatedAt": "2025-10-07T12:14:15.552Z",
//     "createdAt": "2025-10-07T12:14:15.552Z"
// }