# Canada NOCs Monorepo

A monorepo containing packages for working with Canadian National Occupational Classification (NOC) data.

💽 https://noc-canada.onrender.com/api
🗂️ https://noc-canada.onrender.com/api-docs/

## Packages

### @canoeh/nocs

A JavaScript package providing access to NOC data and utilities.

#### Installation

```bash
npm install @canoeh/nocs
# or
pnpm add @canoeh/nocs
```

#### Usage

```javascript
import { getNOCByCode, getAllNOCs, searchNOCs } from "@canoeh/nocs";

// Get a specific NOC
const noc = await getNOCByCode("00010");
console.log(noc.title_en); // "Legislators"

// Get all NOCs
const allNocs = await getAllNOCs();

// Search NOCs by text
const searchResults = await searchNOCs("software engineer");
```

For more details, see the [package documentation](packages/nocs/README.md).

### NOC API

A RESTful API for accessing NOC data.

#### Getting Started

```bash
# Install dependencies
pnpm install

# Start the API server
cd apps/noc-api
pnpm dev
```

The API will be available at `http://localhost:3000`.

#### API Documentation

Swagger documentation is available at `http://localhost:3000/api-docs`.

#### API Endpoints

- `GET /api/nocs`

  - Get all NOC codes with pagination
  - Query parameters:
    - `search`: Filter NOCs by search term
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)

- `GET /api/nocs/{code}`

  - Get a specific NOC by code
  - Parameters:
    - `code`: NOC code (e.g., "00010")

- `GET /api/metadata`
  - Get NOC system metadata
  - Returns version, source, and statistics

Example Response:

```json
{
  "data": [
    {
      "noc_code": "21231",
      "title_en": "Software engineers and designers",
      "title_fr": "Ingénieurs/ingénieures et concepteurs/conceptrices en logiciel",
      "description_en": "Software engineers and designers...",
      "description_fr": "Les ingénieurs et les concepteurs en logiciel...",
      "level": "Unit Group",
      "hierarchy": {
        "broad": {
          "code": "2",
          "title_en": "Natural and applied sciences and related occupations"
        },
        "major": {
          "code": "21",
          "title_en": "Professional occupations in natural and applied sciences"
        },
        "minor": {
          "code": "212",
          "title_en": "Professional occupations in engineering"
        }
      }
    }
  ],
  "pagination": {
    "total": 516,
    "page": 1,
    "limit": 10,
    "totalPages": 52
  }
}
```

## Development

This repository uses pnpm workspaces. To get started:

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

## Data Source

The NOC data is sourced from [Statistics Canada](https://www.statcan.gc.ca/en/subjects/standard/noc/2021/indexV1) and is provided under the [Open Government Licence - Canada](https://open.canada.ca/en/open-government-licence-canada).

## License

MIT
