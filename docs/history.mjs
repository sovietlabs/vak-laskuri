// Store catalogue IDs only. A changed catalogue invalidates previous selections.
export const HISTORY_KEY = 'vak.recent-substances.v1';
export const HISTORY_LIMIT = 10;
const validId = id => typeof id === 'string' && /^\d{1,6}$/.test(id);
export function readRecent(storage, dataset) {
  try {
    const raw = storage.getItem(HISTORY_KEY);
    if (!raw) return {ids: [], available: true};
    if (raw.length > 4096) return {ids: [], available: true};
    const value = JSON.parse(raw);
    if (value?.version !== 1 || value.dataset !== dataset.sha256 || !Array.isArray(value.ids)) return {ids: [], available: true};
    const known = new Set(dataset.rows.map(r => r.id));
    return {ids: [...new Set(value.ids.filter(id => validId(id) && known.has(id)))].slice(0, HISTORY_LIMIT), available: true};
  } catch { return {ids: [], available: false}; }
}
export function rememberRecent(ids, id, dataset) {
  if (!validId(id) || !dataset.rows.some(r => r.id === id)) return ids;
  return [id, ...ids.filter(previous => previous !== id)].slice(0, HISTORY_LIMIT);
}
export function saveRecent(storage, ids, dataset) {
  try {
    const known = new Set(dataset.rows.map(r => r.id));
    const clean = [...new Set(ids.filter(id => validId(id) && known.has(id)))].slice(0, HISTORY_LIMIT);
    storage.setItem(HISTORY_KEY, JSON.stringify({version: 1, dataset: dataset.sha256, ids: clean}));
    return true;
  } catch { return false; }
}
export function clearRecent(storage) {
  try { storage.removeItem(HISTORY_KEY); return true; } catch { return false; }
}
