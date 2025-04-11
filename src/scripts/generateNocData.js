const fs = require("fs").promises;
const csv = require("csv-parser");
const { createReadStream } = require("fs");
const path = require("path");

const CSV_PATH = path.join(
  __dirname,
  "../../data/noc_2021_version_1.0_-_classification_structure.csv"
);

const OUTPUT_DIR = path.join(__dirname, "../../data/generated");

const OUTPUT_FILE = "noc_data.json";

// Base URL for NOC entries
const baseUrl =
  "https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554&CVD=1322870&CPV=";
const urlSuffix = "&CST=01052021&CLV=5&MLV=5";

function getTeerInfo(nocCode) {
  const teerDigit = String(nocCode).padStart(5, "0")[1];
  const teerMap = {
    0: { level: 0, title: "TEER 0 - Management occupations" },
    1: { level: 1, title: "TEER 1 - University degree" },
    2: {
      level: 2,
      title: "TEER 2 - College diploma (2+ years) or apprenticeship",
    },
    3: {
      level: 3,
      title: "TEER 3 - College diploma (<2 years) or apprenticeship",
    },
    4: { level: 4, title: "TEER 4 - High school diploma" },
    5: { level: 5, title: "TEER 5 - Short work demonstration or none" },
  };
  return teerMap[teerDigit] || { level: -1, title: "Unknown TEER level" };
}

async function generateNocData() {
  return new Promise((resolve, reject) => {
    const results = [];
    const hierarchyMap = new Map();
    let rowCount = 0;

    createReadStream(CSV_PATH)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim(),
        })
      )
      .on("data", (data) => {
        rowCount++;

        const level = parseInt(data["Level"]);
        const code = data["Code - NOC 2021 V1.0"]
          ? data["Code - NOC 2021 V1.0"].trim()
          : "";
        const title = data["Class title"] ? data["Class title"].trim() : "";
        const definition = data["Class definition"]
          ? data["Class definition"].trim()
          : "";

        if (code) {
          hierarchyMap.set(code, {
            level,
            code,
            title,
            definition,
          });
        }

        if (level === 5 && code) {
          const broadGroup = code.substring(0, 1);
          const majorGroup = code.substring(0, 2);
          const minorGroup = code.substring(0, 4);

          const entry = {
            noc_code: code,
            title,
            description: definition,
            link: `${baseUrl}${code}${urlSuffix}`,
            teer: getTeerInfo(code),
            hierarchy: {
              broad_group: {
                code: broadGroup,
                title: hierarchyMap.get(broadGroup)?.title || "",
              },
              major_group: {
                code: majorGroup,
                title: hierarchyMap.get(majorGroup)?.title || "",
              },
              minor_group: {
                code: minorGroup,
                title: hierarchyMap.get(minorGroup)?.title || "",
              },
            },
            searchableText: `${code} ${title} ${definition} ${
              hierarchyMap.get(broadGroup)?.title || ""
            } ${hierarchyMap.get(majorGroup)?.title || ""} ${
              hierarchyMap.get(minorGroup)?.title || ""
            }`.toLowerCase(),
          };

          results.push(entry);
        }
      })
      .on("end", async () => {
        try {
          results.sort((a, b) => a.noc_code.localeCompare(b.noc_code));

          await fs.mkdir(OUTPUT_DIR, { recursive: true });

          const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
          console.log("Writing to:", outputPath);

          await fs.writeFile(
            outputPath,
            JSON.stringify(
              {
                metadata: {
                  version: "NOC 2021 Version 1.0",
                  source:
                    "https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554",
                  generated_at: new Date().toISOString(),
                  total_entries: results.length,
                },
                nocs: results,
              },
              null,
              2
            )
          );

          console.log(
            `✅ Successfully generated NOC data JSON file with ${results.length} entries`
          );
          resolve(results);
        } catch (error) {
          console.error("Error writing file:", error);
          reject(error);
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV:", error);
        reject(error);
      });
  });
}

// Execute the function
console.log("Starting NOC data generation...");
generateNocData().catch((error) => {
  console.error("Failed to generate NOC data:", error);
  process.exit(1);
});
