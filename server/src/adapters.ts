export interface SourceAdapter { fetchOne(id: string): Promise<unknown> }
export const bipad: SourceAdapter = {async fetchOne() {throw new Error('BIPAD adapter is not connected or validated');}};
export const reliefweb: SourceAdapter = {async fetchOne(id) {
  const appname = process.env.RELIEFWEB_APPNAME;
  if (!appname || !/^\d+$/.test(id)) throw new Error('Approved appname and numeric report ID required');
  const url = new URL(`https://api.reliefweb.int/v2/reports/${id}`);
  url.searchParams.set('appname', appname);
  for (const field of ['title', 'url', 'date.original', 'source.name']) url.searchParams.append('fields[include][]', field);
  const response = await fetch(url, {signal: AbortSignal.timeout(10000), redirect: 'error'});
  if (!response.ok) throw new Error(`ReliefWeb HTTP ${response.status}`);
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Empty source response');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const {done, value} = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > 1_000_000) {await reader.cancel(); throw new Error('Source response too large');}
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}};
