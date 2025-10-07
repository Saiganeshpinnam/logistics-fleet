# Logistics & Fleet Management - Backend (Ready-to-Run)

## Overview
This is a minimal, ready-to-run backend for the Logistics & Fleet Management System:
- Node.js + Express
- Sequelize ORM (defaults to SQLite for quick local runs)
- Socket.io for real-time location updates
- JWT auth (Admin/Driver/Customer)
- Models: User, Vehicle, Delivery, Tracking
- Conflict detection for scheduling

## Quick start (SQLite - no DB server required)
1. unzip or extract `logistics-backend.zip`
2. `cd backend`
3. `npm install`
4. Create `.env` (copy from `.env.example`) or skip (defaults will use sqlite file)
5. `npm run seed`   # optional: create sample users/vehicles/deliveries
6. `npm run dev`    # or `npm start`

## Using MySQL/Postgres
Set `DB_DIALECT` to `mysql` or `postgres` and provide `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` in `.env`.

## Socket.io
- Server emits `track-<deliveryId>` events whenever a driver sends `locationUpdate`.
- Driver clients should emit `locationUpdate` events with `{ deliveryId, latitude, longitude }`.

## Files
- src/index.js: app entry
- src/config/db.js: Sequelize setup (supports sqlite/mysql/postgres)
- src/models/: Sequelize models
- src/routes/: Express routes
- src/controllers/: controller logic
- src/middleware/: auth & role middleware
- src/utils/conflictCheck.js: prevents overlapping assignments

