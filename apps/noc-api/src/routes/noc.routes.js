import express from "express";
import {
  getAllNOCsController,
  getNOCByCodeController,
  getMetadataController,
} from "../controllers/noc.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: NOC
 *   description: National Occupational Classification endpoints
 */

/**
 * @swagger
 * /api/nocs:
 *   get:
 *     tags: [NOC]
 *     summary: Get all NOC codes with optional search and pagination
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter NOC codes
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of NOC codes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NOC'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get("/", getAllNOCsController);

/**
 * @swagger
 * /api/nocs/metadata:
 *   get:
 *     tags: [NOC]
 *     summary: Get NOC system metadata
 *     responses:
 *       200:
 *         description: NOC system metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *                 source:
 *                   type: string
 *                 totalEntries:
 *                   type: integer
 *                 lastUpdated:
 *                   type: string
 */
router.get("/metadata", getMetadataController);

/**
 * @swagger
 * /api/nocs/{code}:
 *   get:
 *     tags: [NOC]
 *     summary: Get a specific NOC code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: NOC code to retrieve
 *     responses:
 *       200:
 *         description: NOC code details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NOC'
 *       404:
 *         description: NOC code not found
 */
router.get("/:code", getNOCByCodeController);

/**
 * @swagger
 * components:
 *   schemas:
 *     NOC:
 *       type: object
 *       properties:
 *         noc_code:
 *           type: string
 *         title_en:
 *           type: string
 *         title_fr:
 *           type: string
 *         description_en:
 *           type: string
 *         description_fr:
 *           type: string
 *         level:
 *           type: string
 *         hierarchy:
 *           type: object
 *           properties:
 *             broad:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title_en:
 *                   type: string
 *                 title_fr:
 *                   type: string
 *             major:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title_en:
 *                   type: string
 *                 title_fr:
 *                   type: string
 *             minor:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title_en:
 *                   type: string
 *                 title_fr:
 *                   type: string
 */

export default router;
