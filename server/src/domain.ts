import type { Observation, Category } from '../../shared/contracts.ts';

function text(value: unknown, name: string, max = 1000): string {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new Error(`Invalid ${name}`);
  return value.trim();
}
export function reviewedLocation(value: unknown): Observation['location'] {
  if (!value || typeof value !== 'object') throw new Error('Location review is required');
  const v = value as Record<string, unknown>;
  const base = {label: text(v.label, 'location label'), reviewNote: text(v.reviewNote, 'review evidence'), reviewedBy: text(v.reviewedBy, 'reviewer')};
  if (v.precision === 'unresolved') {
    if (v.coordinates !== undefined) throw new Error('Unresolved locations cannot have coordinates');
    return {...base, precision: 'unresolved', reviewRequired: true};
  }
  if (v.precision !== 'approximate' && v.precision !== 'exact') throw new Error('Invalid precision');
  const c = v.coordinates;
  // Broad pilot envelope is a rejection guard, NOT proof of road matching.
  if (!Array.isArray(c) || c.length !== 2 || !c.every(Number.isFinite) || c[0] < 84.3 || c[0] > 84.65 || c[1] < 27.6 || c[1] > 27.95 || v.roadMatchReviewed !== true) {
    throw new Error('Coordinates require manual road matching within the pilot envelope');
  }
  return {...base, precision: v.precision, reviewRequired: false, point: {type: 'Point', coordinates: [c[0], c[1]]}};
}
export function normalizeReport(payload: unknown, review: unknown, now = new Date().toISOString()): Observation {
  const data = (payload as {data?: unknown[]})?.data;
  if (!Array.isArray(data) || data.length !== 1) throw new Error('Expected one ReliefWeb report');
  const item = data[0] as {id?: unknown; fields?: Record<string, any>};
  const f = item.fields;
  const r = review as Record<string, unknown>;
  if (!f || !r || r.rightsReviewed !== true || r.corridorRelevant !== true) throw new Error('Source rights and pilot relevance must be reviewed');
  const id = text(String(item.id ?? ''), 'source ID');
  if (!/^\d+$/.test(id) || r.sourceId !== id) throw new Error('Review must match the source ID');
  const url = new URL(text(f.url, 'source URL'));
  if (url.protocol !== 'https:' || url.hostname !== 'reliefweb.int') throw new Error('Unexpected source URL');
  const categories: Category[] = ['landslide', 'flood', 'closure', 'accident', 'other'];
  if (!categories.includes(r.category as Category)) throw new Error('Invalid incident category');
  const date = f.date?.original;
  if (date != null && (typeof date !== 'string' || !Number.isFinite(Date.parse(date)))) throw new Error('Invalid publication date');
  return {source: 'reliefweb', sourceId: id, sourceUrl: url.href,
    publisher: text(f.source?.map((s: {name?: unknown}) => text(s.name, 'publisher')).join(', '), 'publisher'),
    title: text(f.title, 'title'), publishedAt: date ? new Date(date).toISOString() : null,
    detectedAt: now, lastConfirmedAt: null, verification: 'unverified', category: r.category as Category,
    corridor: 'narayangadh-muglin', location: reviewedLocation(r.location)};
}
export interface ObservationStore { insertOnce(observation: Observation): Promise<boolean> }
export async function ingest(store: ObservationStore, observation: Observation) {
  return {inserted: await store.insertOnce(observation), sourceId: observation.sourceId};
}
