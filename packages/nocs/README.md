# @noc/core

Core package for working with Canadian National Occupational Classification (NOC) data.

## Installation

```bash
npm install @canoeh/nocs
# or
pnpm add @canoeh/nocs
```

## Usage

```js
import { getNOCByCode, getAllNOCs } from "@canoeh/nocs";

// Get a specific NOC
const noc = getNOCByCode("00010");
console.log(noc.title_en); // "Legislators"

// Get all NOCs
const allNocs = getAllNOCs();
```

## License

MIT
