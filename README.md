# NOC (National Occupational Classification) API

A RESTful API service that provides access to Canada's National Occupational Classification (NOC) 2021 Version 1.0 data. This service allows users to search, browse, and retrieve detailed information about NOC codes and their classifications.

## 📖 Table of Contents

- [NOC (National Occupational Classification) API](#noc-national-occupational-classification-api)
  - [📖 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🔧 Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
  - [🔄 Data Generation](#-data-generation)
  - [📚 API Documentation](#-api-documentation)
    - [Endpoints](#endpoints)
      - [1. Get NOC List](#1-get-noc-list)
      - [2. Get NOC by Code](#2-get-noc-by-code)
      - [3. Get API Information](#3-get-api-information)
  - [📁 Project Structure](#-project-structure)

## ✨ Features

- **Search NOC Codes**: Search by code, title, or description
- **Hierarchical Data**: Access complete hierarchical information (broad, major, and minor groups)
- **Pagination**: Browse through NOC codes with customizable page sizes
- **Official Links**: Direct links to Statistics Canada's NOC pages
- **Rich Metadata**: Comprehensive information about each NOC code
- **OpenAPI Documentation**: Interactive API documentation via Swagger UI

## 🔧 Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn
- Git

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/noc-canada.git
cd noc-canada
```

2. Install dependencies:

```bash
npm install
```

3. Generate the NOC data:

```bash
npm run generate-data
```

4. Start the server:

```bash
npm start
```

## 🔄 Data Generation

The project includes a data generation script that converts the Statistics Canada NOC CSV file into an optimized JSON format. The script:

1. Parses the NOC CSV data
2. Extracts hierarchical relationships
3. Adds searchable text combinations
4. Generates official Statistics Canada links
5. Creates an optimized JSON structure

To regenerate the data:

```bash
npm run generate-data
```

Generated data will be stored in `data/generated/noc_data.json`.

## 📚 API Documentation

### Endpoints

#### 1. Get NOC List

```http
GET /api/nocs?page=1&limit=20&search=engineer
```

Query Parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search term for title/description

Response:

```json
{
  "metadata": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "total_pages": 8,
    "has_next": true,
    "has_previous": false
  },
  "data": [
    {
      "noc_code": "21234",
      "title": "Web developers and programmers",
      "description": "...",
      "link": "https://www23.statcan.gc.ca/...",
      "hierarchy": {
        "broad_group": { ... },
        "major_group": { ... },
        "minor_group": { ... }
      }
    }
  ]
}
```

#### 2. Get NOC by Code

```http
GET /api/nocs/:code
```

Response:

```json
{
  "noc_code": "21234",
  "title": "Web developers and programmers",
  "description": "...",
  "link": "https://www23.statcan.gc.ca/...",
  "hierarchy": {
    "broad_group": { ... },
    "major_group": { ... },
    "minor_group": { ... }
  }
}
```

#### 3. Get API Information

```http
GET /api/info
```

Response:

```json
{
  "version": "NOC 2021 Version 1.0",
  "source": "https://www23.statcan.gc.ca/...",
  "total_entries": 500
}
```

## 📁 Project Structure
