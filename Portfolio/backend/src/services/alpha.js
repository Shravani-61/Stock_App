const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Read Alpha Vantage API key from standard env var
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
if (!API_KEY) console.warn('ALPHA_VANTAGE_API_KEY is missing in env');

// Simple in-memory cache with TTL
const cache = new Map();
function setCache(key, data, ttlMs) {
  cache.set(key, { data, expiry: Date.now() + ttlMs });
}
function getCache(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiry) { cache.delete(key); return null; }
  return hit.data;
}

async function getQuote(symbol) {
  const key = `quote:${symbol.toUpperCase()}`;
  const cached = getCache(key);
  if (cached) return cached;
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AlphaVantage quote error: ${res.status}`);
  const json = await res.json();
  // If Alpha Vantage indicates rate limit or info, do NOT overwrite cache
  if (json && (json.Note || json.Information)) {
    if (cached) return cached; // return previous cached data if available
    const err = new Error('Rate limit reached. Please try again later.');
    err.code = 'RATE_LIMIT';
    throw err;
  }
  setCache(key, json, 60 * 1000); // cache 60s to respect rate limits
  return json;
}

async function getDaily(symbol) {
  const key = `daily:${symbol.toUpperCase()}`;
  const cached = getCache(key);
  if (cached) return cached;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AlphaVantage daily error: ${res.status}`);
  const json = await res.json();
  // If Alpha Vantage indicates rate limit or info, do NOT overwrite cache
  if (json && (json.Note || json.Information)) {
    if (cached) return cached; // return previous cached data if available
    const err = new Error('Rate limit reached. Please try again later.');
    err.code = 'RATE_LIMIT';
    throw err;
  }
  setCache(key, json, 5 * 60 * 1000); // cache 5 minutes
  return json;
}

module.exports = { getQuote, getDaily };
