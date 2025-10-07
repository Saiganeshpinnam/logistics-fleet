import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import deliveryRoutes from './routes/delivery.routes.js';
import trackingRoutes from './routes/tracking.routes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// attach io to app for controllers if needed
app.set('io', io);

app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/tracking', trackingRoutes);

// socket handling
io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  socket.on('locationUpdate', (data) => {
    // broadcast to listeners of this delivery
    if (data && data.deliveryId) {
      io.emit(`track-${data.deliveryId}`, data);
    }
  });

  socket.on('disconnect', () => {
    // console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch(err => {
  console.error('DB sync error:', err);
});
