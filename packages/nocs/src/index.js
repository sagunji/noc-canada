import nocData from '../data/noc.json' with { type: 'json' };

/**
 * Get NOC data by code
 * @param {string} code - The NOC code to look up
 * @returns {Object|undefined} The NOC data object or undefined if not found
 */
export function getNOCByCode(code) {
  return nocData.nocs.find((noc) => noc.noc_code === code);
}

/**
 * Search NOCs by a search term
 * @param {string} searchTerm - The term to search for
 * @returns {Array} Array of matching NOC entries
 */
export function searchNOCs(searchTerm) {
  if (!searchTerm) {
    return [];
  }

  const term = searchTerm.toLowerCase();

  return nocData.nocs.filter((noc) => {
    return noc.searchableText.toLowerCase().includes(term);
  });
}

/**
 * Get all NOC data
 * @returns {Array} Array of all NOC entries
 */
export function getAllNOCs() {
  return nocData.nocs;
}

/**
 * Get metadata about the NOC dataset
 * @returns {Object} Metadata object
 */
export function getMetadata() {
  return nocData.metadata;
}

/**
 * Get the total number of NOC entries
 * @returns {number} Total number of NOC entries
 */
export function getTotalNOCs() {
  return nocData.length;
}

/**
 * Get popular NOCs
 * @returns {Array} Array of popular NOCs
 */
export function getPopularNOCs() {
  const inDemandNOCs = [
    "21232",
    "31301",
    "70010",
    "75101",
    "72106",
    "73300",
    "73301",
    "11202",
    "64409",
    "12200",
  ];
  return inDemandNOCs.map((noc) => getNOCByCode(noc));
}

