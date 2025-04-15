import {
  getNOCByCode,
  getAllNOCs,
  searchNOCs,
  getMetadata,
} from "@canoeh/nocs";

export const getAllNOCsController = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    let nocs = getAllNOCs();

    if (search) {
      nocs = searchNOCs(search);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedNocs = nocs.slice(start, end);

    res.json({
      data: paginatedNocs,
      pagination: {
        total: nocs.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(nocs.length / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNOCByCodeController = async (req, res) => {
  try {
    const { code } = req.params;
    const noc = getNOCByCode(code);

    if (!noc) {
      return res.status(404).json({ error: "NOC code not found" });
    }

    res.json(noc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMetadataController = async (req, res) => {
  try {
    const metadata = getMetadata();
    console.log(metadata);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
