const express = require("express");
const router = express.Router();
const NocService = require("../services/noc.service");

// Cache duration in seconds
const CACHE_DURATIONS = {
  LIST: 3600, // 1 hour for lists
  DETAIL: 86400, // 24 hours for individual NOC details
  INFO: 604800, // 1 week for static info
};

/**
 * Generate ETag for response data
 * @param {Object} data Response data
 * @returns {string} ETag value
 */
function generateETag(data) {
  return require("crypto")
    .createHash("md5")
    .update(JSON.stringify(data))
    .digest("hex");
}

/**
 * @swagger
 * /api/nocs:
 *   get:
 *     summary: Get a paginated list of NOC codes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for title or description
 */
router.get("/nocs", async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const results = await NocService.getNocs(
      parseInt(page),
      parseInt(limit),
      search
    );

    const etag = generateETag(results);

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    res.set({
      "Cache-Control": `public, max-age=${CACHE_DURATIONS.LIST}`,
      ETag: etag,
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/nocs/{code}:
 *   get:
 *     summary: Get NOC entry by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: NOC code
 */
router.get("/nocs/:code", async (req, res) => {
  try {
    const noc = await NocService.getNocByCode(req.params.code);
    if (!noc) {
      return res.status(404).json({ error: "NOC code not found" });
    }

    const etag = generateETag(noc);

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    res.set({
      "Cache-Control": `public, max-age=${CACHE_DURATIONS.DETAIL}`,
      ETag: etag,
    });

    res.json(noc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Get NOC metadata including version, source, and statistics
 */
router.get("/info", async (req, res) => {
  try {
    const info = {
      noc_version: "NOC 2021 Version 1.0",
      source:
        "https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554",
      last_updated: await NocService.getMetadata().generated_at,
    };

    const etag = generateETag(info);

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).end();
    }

    res.set({
      "Cache-Control": `public, max-age=${CACHE_DURATIONS.INFO}`,
      ETag: etag,
    });

    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
