const fs = require("fs").promises;
const path = require("path");

class NocService {
  constructor() {
    this.nocs = [];
    this.metadata = {};
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      const data = JSON.parse(
        await fs.readFile(
          path.join(__dirname, "../../data/generated/noc_data.json"),
          "utf-8"
        )
      );
      this.nocs = data.nocs;
      this.metadata = data.metadata;
      this.initialized = true;
    } catch (error) {
      throw new Error("Failed to load NOC data: " + error.message);
    }
  }

  async getNocs(page = 1, limit = 20, search = "") {
    await this.initialize();

    let filteredNocs = this.nocs;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredNocs = this.nocs.filter((noc) =>
        noc.searchableText.includes(searchLower)
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalPages = Math.ceil(filteredNocs.length / limit);

    return {
      metadata: {
        total: filteredNocs.length,
        page,
        limit,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_previous: page > 1,
      },
      data: filteredNocs.slice(startIndex, endIndex),
    };
  }

  async getNocByCode(code) {
    await this.initialize();
    return this.nocs.find((noc) => noc.noc_code === code);
  }

  async getMetadata() {
    await this.initialize();
    return this.metadata;
  }
}

module.exports = new NocService();
