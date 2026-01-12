const fs = require('fs');
const lines = fs.readFileSync('catalog_dump.txt', 'utf-8').split('\n');

const start = 1300;
const end = 1400;

console.log(`Lines ${start}-${end}:`);
for (let i = start; i < Math.min(end, lines.length); i++) {
    console.log(lines[i]);
}
