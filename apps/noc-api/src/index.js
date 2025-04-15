import express from "express";
import { getNOCByCode, getAllNOCs, searchNOCs } from "@canoeh/nocs";

const app = express();
const port = process.env.PORT || 3000;

app.get("/noc/:code", (req, res) => {
  const noc = getNOCByCode(req.params.code);
  if (!noc) {
    return res.status(404).json({ error: "NOC not found" });
  }
  res.json(noc);
});

app.get("/nocs", (req, res) => {
  const { q } = req.query;

  if (q) {
    const results = searchNOCs(q);
    return res.json({
      query: q,
      count: results.length,
      results,
    });
  }

  const allNocs = getAllNOCs();
  res.json({
    count: allNocs.length,
    results: allNocs,
  });
});

app.listen(port, () => {
  console.log(`NOC API listening at http://localhost:${port}`);
});
