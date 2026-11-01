import express from 'express';
import mongoose from 'mongoose';
import {connectDatabase, ObservationModel} from './db.ts';
const app = express();
app.disable('x-powered-by');
app.get('/api/v1/health', (_req, res) => res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({database: mongoose.connection.readyState === 1 ? 'connected' : 'unavailable', bipad: 'not-connected'}));
app.get('/api/v1/incidents', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {res.status(503).json({error: 'Incident database unavailable'}); return;}
  try {
    const observations = await ObservationModel.find({corridor: 'narayangadh-muglin'}).sort({publishedAt: -1}).limit(100).select('-_id -location.reviewedBy').lean();
    res.json({observations, sourceStatus: 'Manual single-report collection; coverage incomplete', bipadStatus: 'not-connected'});
  } catch {res.status(503).json({error: 'Incident query failed'});}
});
try {await connectDatabase();} catch {console.error('MongoDB unavailable; incident requests will return 503. Configure MONGODB_URI and restart.');}
const server = app.listen(Number(process.env.PORT ?? 3001), '127.0.0.1');
process.on('SIGINT', () => {server.close(); void mongoose.disconnect();});
