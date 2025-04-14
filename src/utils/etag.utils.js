const crypto = require("crypto");

/**
 * Generate ETag for response data
 * @param {Object|Array|string} data - The data to generate an ETag for
 * @returns {string} The generated ETag
 */
function generateETag(data) {
  return crypto.createHash("md5").update(JSON.stringify(data)).digest("hex");
}

/**
 * Check if the request's If-None-Match header matches the ETag
 * @param {Object} req - Express request object
 * @param {string} etag - The ETag to compare against
 * @returns {boolean} True if ETag matches, false otherwise
 */
function isETagMatch(req, etag) {
  const ifNoneMatch = req.headers["if-none-match"];
  return ifNoneMatch === etag;
}

/**
 * Set cache control headers for the response
 * @param {Object} res - Express response object
 * @param {number} maxAge - Maximum age in seconds
 * @param {string} etag - The ETag value
 */
function setCacheHeaders(res, maxAge, etag) {
  res.set({
    "Cache-Control": `public, max-age=${maxAge}`,
    ETag: etag,
  });
}

/**
 * Handle ETag comparison and set appropriate cache headers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object|Array|string} data - The response data
 * @param {number} maxAge - Maximum age in seconds
 * @returns {boolean} True if 304 was sent, false otherwise
 */
function handleETag(req, res, data, maxAge) {
  const etag = generateETag(data);

  if (isETagMatch(req, etag)) {
    res.status(304).end();
    return true;
  }

  setCacheHeaders(res, maxAge, etag);
  return false;
}

// Cache duration constants (in seconds)
const CACHE_DURATIONS = {
  LIST: 3600, // 1 hour for lists
  DETAIL: 86400, // 24 hours for individual NOC details
  INFO: 604800, // 1 week for static info
};

module.exports = {
  generateETag,
  isETagMatch,
  setCacheHeaders,
  handleETag,
  CACHE_DURATIONS,
};
