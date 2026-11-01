import mongoose from 'mongoose';
import type { Observation } from '../../shared/contracts.ts';
const schema = new mongoose.Schema({
  source: {type: String, required: true}, sourceId: {type: String, required: true},
  sourceUrl: String, publisher: String, title: String, publishedAt: String, detectedAt: String,
  lastConfirmedAt: String, verification: String, category: String, corridor: String,
  location: {label: String, precision: String, reviewRequired: Boolean, reviewNote: String, reviewedBy: String,
    point: {type: {type: String, enum: ['Point']}, coordinates: [Number]}}
}, {versionKey: false});
schema.index({source: 1, sourceId: 1}, {unique: true});
schema.index({'location.point': '2dsphere'});
export const ObservationModel = mongoose.model('SourceObservation', schema);
export async function connectDatabase() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');
  await mongoose.connect(process.env.MONGODB_URI, {serverSelectionTimeoutMS: 5000});
  await ObservationModel.init();
}
export const store = {async insertOnce(observation: Observation) {
  try {
    const result = await ObservationModel.updateOne({source: observation.source, sourceId: observation.sourceId}, {$setOnInsert: observation}, {upsert: true});
    return result.upsertedCount === 1;
  } catch (error) {
    if ((error as {code?: number}).code === 11000) return false;
    throw error;
  }
}};
