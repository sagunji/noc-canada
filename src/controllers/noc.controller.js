const NocService = require("../services/noc.service");
const { handleETag, CACHE_DURATIONS } = require("../utils/etag.utils");

class NocController {
  async getNocsList(req, res) {
    try {
      const { page = 1, limit = 20, search } = req.query;
      const results = await NocService.getNocs(
        parseInt(page),
        parseInt(limit),
        search
      );

      if (handleETag(req, res, results, CACHE_DURATIONS.LIST)) {
        return;
      }

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNocByCode(req, res) {
    try {
      const noc = await NocService.getNocByCode(req.params.code);

      if (!noc) {
        return res.status(404).json({ error: "NOC code not found" });
      }

      if (handleETag(req, res, noc, CACHE_DURATIONS.DETAIL)) {
        return;
      }

      res.json(noc);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getApiInfo(req, res) {
    try {
      const info = {
        noc_version: "NOC 2021 Version 1.0",
        source:
          "https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554",
        last_updated: await NocService.getMetadata().generated_at,
      };

      if (handleETag(req, res, info, CACHE_DURATIONS.INFO)) {
        return;
      }

      res.json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NocController();
