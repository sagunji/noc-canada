const express = require("express");
const router = express.Router();
const NocService = require("../services/noc.service");

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
    const metadata = await NocService.getMetadata();
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
