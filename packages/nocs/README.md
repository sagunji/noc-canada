# @canoeh/nocs

A simple package to work with Canadian National Occupational Classification (NOC) codes.

## Installation

```bash
npm install @canoeh/nocs
# or
pnpm add @canoeh/nocs
```

## Usage

```js
import { getNOCByCode, getAllNOCs, searchNOCs } from "@canoeh/nocs";

// Get a specific NOC
const noc = getNOCByCode("00010");
console.log(noc.title_en); // "Legislators"

// Get all NOCs
const allNocs = getAllNOCs();

// Search NOCs by text
const searchResults = searchNOCs("software engineer");
console.log(searchResults[0].title_en); // "Software engineers and designers"
console.log(searchResults[0].noc_code); // "21231"
```

## API

### `getNOCByCode(code: string)`

Returns a NOC object for the given code.

### `getAllNOCs()`

Returns an array of all NOC objects.

### `searchNOCs(query: string)`

Returns an array of NOC objects that match the search query. The search is performed on:

- NOC code
- English title
- French title
- English description
- French description

## Data Source

The data is sourced from [Statistics Canada](https://www.statcan.gc.ca/en/start) and is provided under the [Open Government Licence - Canada](https://open.canada.ca/en/open-government-licence-canada).

## License

MIT
