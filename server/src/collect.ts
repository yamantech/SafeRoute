import {readFile} from 'node:fs/promises';
import mongoose from 'mongoose';
import {reliefweb} from './adapters.ts';
import {normalizeReport, ingest} from './domain.ts';
import {connectDatabase, store} from './db.ts';
try {
  const file = process.env.SOURCE_REVIEW_FILE;
  const id = process.env.RELIEFWEB_REPORT_ID;
  if (!file || !id) throw new Error('SOURCE_REVIEW_FILE and RELIEFWEB_REPORT_ID required');
  const review = JSON.parse(await readFile(file, 'utf8'));
  // Permission review precedes any automated request.
  if (review.rightsReviewed !== true || review.sourceId !== id) throw new Error('Matching source-rights review required');
  const observation = normalizeReport(await reliefweb.fetchOne(id), review);
  await connectDatabase();
  console.log(await ingest(store, observation));
} catch {
  console.error('Collection failed. Check configuration, source approval, review metadata, network and MongoDB. No success is assumed.');
  process.exitCode = 1;
} finally {await mongoose.disconnect();}
