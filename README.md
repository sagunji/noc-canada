# NOC (National Occupational Classification) API

A RESTful API service that provides access to Canada's National Occupational Classification (NOC) 2021 Version 1.0 data. This service allows users to search, browse, and retrieve detailed information about NOC codes and their classifications.

🌎 https://noc-canada.onrender.com/api/
📖 https://noc-canada.onrender.com/api/docs/

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
  - [🎓 TEER Classification](#-teer-classification)
  - [🚀 Development](#-development)
    - [Available Scripts](#available-scripts)
  - [📊 Data Source](#-data-source)
  - [📄 License](#-license)
  - [🤝 Contributing](#-contributing)

## ✨ Features

- **Search NOC Codes**: Search by code, title, or description
- **Hierarchical Data**: Access complete hierarchical information (broad, major, and minor groups)
- **TEER Classification**: Training, Education, Experience and Responsibilities (TEER) category for each NOC
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
3. Adds TEER classification information
4. Adds searchable text combinations
5. Generates official Statistics Canada links
6. Creates an optimized JSON structure

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
    "limit": 20
  },
  "data": [
    {
      "noc_code": "21234",
      "title": "Web developers and programmers",
      "description": "...",
      "link": "https://www23.statcan.gc.ca/...",
      "teer": {
        "level": 1,
        "title": "TEER 1 - University degree"
      },
      "hierarchy": {
        "broad_group": {
          "code": "2",
          "title": "Natural and Applied Sciences and Related Occupations"
        },
        "major_group": {
          "code": "21",
          "title": "Professional Occupations in Natural and Applied Sciences"
        },
        "minor_group": {
          "code": "2123",
          "title": "Computer, Software and Web Designers and Developers"
        }
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
  "teer": {
    "level": 1,
    "title": "TEER 1 - University degree"
  },
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

## 🎓 TEER Classification

The NOC 2021 uses TEER (Training, Education, Experience and Responsibilities) categories to classify occupations. Each NOC code includes TEER information:

| TEER Level | Description                                  |
| ---------- | -------------------------------------------- |
| TEER 0     | Management occupations                       |
| TEER 1     | University degree                            |
| TEER 2     | College diploma (2+ years) or apprenticeship |
| TEER 3     | College diploma (<2 years) or apprenticeship |
| TEER 4     | High school diploma                          |
| TEER 5     | Short work demonstration or none             |

The TEER level is determined by the second digit of the NOC code. For example, in NOC code "21234":

- Second digit is "1"
- Therefore, it's a TEER 1 occupation requiring a university degree

## 🚀 Development

### Available Scripts

```bash
# Generate NOC data
npm run generate-data

# Start development server
npm run dev

# Start production server
npm start
```

## 📊 Data Source

This project uses data from Statistics Canada's National Occupational Classification (NOC) 2021 Version 1.0. The data is sourced from:

[Statistics Canada NOC 2021](https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1322554)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ for the Canadian development community
