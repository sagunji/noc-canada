import { Hono } from "hono";
import { cors } from "hono/cors";
import { getNOCByCode, getAllNOCs, searchNOCs } from "@canoeh/nocs";

const app = new Hono();

// Middleware
app.use("*", cors());

// Routes
app.get("/", async (c) => {
  return c.json({
    author: "Sagun Karanjit",
    github: "https://github.com/sagunji/noc-canada",
    pkg: "https://www.npmjs.com/package/@canoeh/nocs",
  });
});

app.get("/metadata", async (c) => {
  return c.json({
    version: "2021 Version 1.0",
    source: "Statistics Canada",
    totalEntries: (await getAllNOCs()).length,
    lastUpdated: "2021-11-16",
    github: "https://github.com/sagunji/noc-canada",
    pkg: "https://www.npmjs.com/package/@canoeh/nocs",
  });
});

app.get("/api/nocs/:code", async (c) => {
  const code = c.req.param("code");
  const noc = await getNOCByCode(code);

  if (!noc) {
    return c.json({ error: "NOC code not found" }, 404);
  }

  return c.json(noc);
});

app.get("/api/nocs", async (c) => {
  const { search, page = "1", limit = "10" } = c.req.query();
  let nocs = await getAllNOCs();

  if (search) {
    nocs = await searchNOCs(search);
  }

  const start = (parseInt(page) - 1) * parseInt(limit);
  const end = start + parseInt(limit);
  const paginatedNocs = nocs.slice(start, end);

  return c.json({
    data: paginatedNocs,
    pagination: {
      total: nocs.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(nocs.length / parseInt(limit)),
    },
  });
});

// Export the fetch handler for Cloudflare Workers
export default {
  fetch: app.fetch,
};
