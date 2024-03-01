const cache = new Map(); // Simple in-memory cache

function cachingMiddleware(req, res, next) {
  const cacheKey = req.url; // Use URL as cache key

  // Check if response is cached and valid
  if (cache.has(cacheKey) && isCacheValid(cache.get(cacheKey))) {
    const cachedResponse = cache.get(cacheKey);
    res.send(cachedResponse.data);
    return;
  }

  // Response not cached or expired, proceed to original route handler
  next();

  // After route handler, cache the response if successful
  res.on('finish', () => {
    if (res.statusCode === 200) {
      const response = {
        data: res.send(), // Capture already sent data
        timestamp: Date.now(),
        expiry: 1000 * 60 * 60, // One hour expiration (adjustable)
      };
      cache.set(cacheKey, response);
    }
  });
}

function isCacheValid(cachedResponse) {
  return Date.now() - cachedResponse.timestamp < cachedResponse.expiry;
}

module.exports = cachingMiddleware;
