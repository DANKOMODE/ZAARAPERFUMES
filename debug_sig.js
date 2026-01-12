const fs = require('fs');

const rawText = fs.readFileSync('catalog_dump.txt', 'utf-8');
const lines = rawText.split('\n');

let pendingProduct = null;

lines.slice(0, 100).forEach((line, index) => {
    line = line.trim();
    if (!line) return;

    if (line.match(/^\d+AED/)) {
        if (pendingProduct) {
            const oid = parseInt(pendingProduct.originalId);
            console.log(`Processing Price Line for ID: ${oid} Name: ${pendingProduct.name}`);
            if (oid <= 34) console.log(' -> SHOULD BE SIGNATURE');
            pendingProduct = null;
        }
    }
    else {
        const nameMatch = line.match(/^(\d+)\s*(.+)$/);
        if (nameMatch) {
            pendingProduct = {
                originalId: nameMatch[1],
                name: nameMatch[2].trim()
            };
            console.log(`Found Name Line: ${nameMatch[1]} - ${nameMatch[2].trim()}`);
        }
    }
});
