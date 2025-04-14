const express = require("express");
const router = express.Router();
const nocController = require("../controllers/noc.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Hierarchy:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "2"
 *         title:
 *           type: string
 *           example: "Natural and Applied Sciences and Related Occupations"
 *     TEER:
 *       type: object
 *       properties:
 *         level:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "TEER 1 - University degree"
 *     NOC:
 *       type: object
 *       properties:
 *         noc_code:
 *           type: string
 *           example: "21234"
 *         level:
 *           type: integer
 *           example: 5
 *         title:
 *           type: string
 *           example: "Web developers and programmers"
 *         description:
 *           type: string
 *           example: "Web developers and programmers use a variety of programming languages..."
 *         link:
 *           type: string
 *           example: "https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554&CVD=1322870&CPV=21234&CST=01052021&CLV=5&MLV=5"
 *         teer:
 *           $ref: '#/components/schemas/TEER'
 *         hierarchy:
 *           type: object
 *           properties:
 *             broad_group:
 *               $ref: '#/components/schemas/Hierarchy'
 *             major_group:
 *               $ref: '#/components/schemas/Hierarchy'
 *             minor_group:
 *               $ref: '#/components/schemas/Hierarchy'
 *     PaginatedNOCResponse:
 *       type: object
 *       properties:
 *         metadata:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 500
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 20
 *             total_pages:
 *               type: integer
 *               example: 25
 *             has_next:
 *               type: boolean
 *               example: true
 *             has_previous:
 *               type: boolean
 *               example: false
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NOC'
 *     ApiInfo:
 *       type: object
 *       properties:
 *         noc_version:
 *           type: string
 *           example: "NOC 2021 Version 1.0"
 *         source:
 *           type: string
 *           example: "https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554"
 *         last_updated:
 *           type: string
 *           format: date-time
 *           example: "2024-04-11T02:11:50.207Z"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "NOC code not found"
 *
 * /api/nocs:
 *   get:
 *     summary: Get a paginated list of NOC codes
 *     description: Retrieve a list of NOC codes with optional search and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering NOC codes
 *     responses:
 *       200:
 *         description: Successful response with paginated NOC codes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedNOCResponse'
 *       304:
 *         description: Not modified (when using ETag)
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/nocs/{code}:
 *   get:
 *     summary: Get NOC details by code
 *     description: Retrieve detailed information about a specific NOC code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The NOC code (e.g., "21234")
 *         example: "21234"
 *     responses:
 *       200:
 *         description: Successful response with NOC details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NOC'
 *       304:
 *         description: Not modified (when using ETag)
 *       404:
 *         description: NOC code not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/info:
 *   get:
 *     summary: Get API information
 *     description: Retrieve metadata about the NOC API
 *     responses:
 *       200:
 *         description: Successful response with API information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiInfo'
 *       304:
 *         description: Not modified (when using ETag)
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
