const googleTrends = require('google-trends-api');

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const cache = new Map();

// Retry configuration
const MAX_RETRIES = 5;
const RETRY_DELAY = 100; // 2 seconds

/**
 * Sleep utility function
 * @param {number} ms Milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches trend data with retries
 * @param {string} term Search term
 * @returns {Promise<{score: number}>}
 */
async function getTrendScore(term) {
  // Check cache first
  const cachedResult = getCachedResult(term);
  if (cachedResult) {
    return cachedResult;
  }

  let lastError;
  
  // Try multiple times
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // Add a small delay between retries
      if (attempt > 0) {
        await sleep(RETRY_DELAY * attempt); // Exponential backoff
      }

      const startTime = new Date();
      startTime.setFullYear(startTime.getFullYear() - 1);

      const results = await googleTrends.interestOverTime({
        keyword: term.toLowerCase(),
        startTime,
        granularTimeResolution: false
      });

      const { timelineData } = JSON.parse(results).default;
      
      if (!timelineData || timelineData.length === 0) {
        throw new Error('No data returned from Google Trends');
      }

      const score = timelineData[timelineData.length - 1]?.value[0];
      
      if (typeof score !== 'number') {
        throw new Error('Invalid score value received');
      }

      // Cache successful result
      const result = { score };
      cacheResult(term, result);
      return result;

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1}/${MAX_RETRIES} failed for "${term}":`, error.message);
    }
  }

  // If all retries failed, throw the last error
  throw new Error(`Failed to fetch Google Trends data for "${term}" after ${MAX_RETRIES} attempts: ${lastError.message}`);
}

/**
 * Gets cached result if valid
 * @param {string} term Search term
 * @returns {null|{score: number}}
 */
function getCachedResult(term) {
  const cached = cache.get(term);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(term);
  return null;
}

/**
 * Caches the result
 * @param {string} term Search term
 * @param {{score: number}} data Result to cache
 */
function cacheResult(term, data) {
  cache.set(term, {
    timestamp: Date.now(),
    data
  });
}

/**
 * Batch process multiple terms
 * @param {string[]} terms Array of search terms
 * @returns {Promise<{[key: string]: number}>}
 */
async function getBatchTrendScores(terms) {
  const uniqueTerms = [...new Set(terms)];
  const results = {};
  const errors = [];

  for (const term of uniqueTerms) {
    try {
      const result = await getTrendScore(term);
      results[term] = result.score;
    } catch (error) {
      errors.push({ term, error: error.message });
      console.error(`Error fetching trend for "${term}":`, error.message);
    }
  }

  if (errors.length > 0) {
    const errorMessage = errors.map(e => `${e.term}: ${e.error}`).join('\n');
    throw new Error(`Failed to fetch some trends:\n${errorMessage}`);
  }

  return results;
}

// Clean up expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [term, entry] of cache.entries()) {
    if (now - entry.timestamp >= CACHE_DURATION) {
      cache.delete(term);
    }
  }
}, CACHE_DURATION);

module.exports = {
  getTrendScore,
  getBatchTrendScores
};