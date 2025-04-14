const express = require("express");
const router = express.Router();
const nocController = require("../controllers/noc.controller");

/**
 * @swagger
 * /api/nocs:
 *   get:
 *     summary: Get a list of NOC codes
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
 *         description: Search term
 */
router.get("/nocs", nocController.getNocsList);

/**
 * @swagger
 * /api/nocs/{code}:
 *   get:
 *     summary: Get NOC details by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: NOC code
 */
router.get("/nocs/:code", nocController.getNocByCode);

/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Get API information
 */
router.get("/info", nocController.getApiInfo);

module.exports = router;
