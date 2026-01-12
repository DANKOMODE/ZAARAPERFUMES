const fs = require('fs');
const buffer = fs.readFileSync('catalog_dump.txt');
console.log('Buffer length:', buffer.length);
console.log('First 500 chars (utf-8):');
console.log(buffer.slice(0, 500).toString('utf-8'));
console.log('---');
