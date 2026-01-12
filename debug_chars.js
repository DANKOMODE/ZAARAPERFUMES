const fs = require('fs');
const rawText = fs.readFileSync('catalog_dump.txt', 'utf-8');
const lines = rawText.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('AED')) {
        console.log('--- LINE START ---');
        console.log(JSON.stringify(lines[i]));
        console.log('--- LINE END ---');
        break;
    }
}
