/**
 * Module-level store that persists health check results across route changes.
 * Results survive forward/back navigation.
 * Cleared when the user clicks "Run All".
 */
const store = {
  results: null,   // { [checkId]: { status, result, error } } | null
  lastRunAt: null, // Date | null
};

export function hasStoredResults() {
  return store.results !== null;
}

export function getStoredResults() {
  return store.results;
}

export function getStoredLastRunAt() {
  return store.lastRunAt;
}

export function setStoredResult(id, resultData) {
  if (!store.results) store.results = {};
  store.results[id] = { ...resultData };
}

export function setStoredLastRunAt(lastRunAt) {
  store.lastRunAt = lastRunAt;
}

export function clearStore() {
  store.results = null;
  store.lastRunAt = null;
}
