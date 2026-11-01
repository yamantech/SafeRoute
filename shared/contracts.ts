export type Category = 'landslide' | 'flood' | 'closure' | 'accident' | 'other';
export interface Observation {
  source: 'reliefweb'; sourceId: string; sourceUrl: string; publisher: string;
  title: string; publishedAt: string | null; detectedAt: string;
  lastConfirmedAt: string | null; category: Category;
  verification: 'unverified'; corridor: 'narayangadh-muglin';
  location: { label: string; precision: 'unresolved' | 'approximate' | 'exact';
    point?: {type: 'Point'; coordinates: [number, number]};
    reviewRequired: boolean; reviewNote: string; reviewedBy: string };
}
export interface IncidentResponse { observations: Observation[]; sourceStatus: string; bipadStatus: 'not-connected' }
