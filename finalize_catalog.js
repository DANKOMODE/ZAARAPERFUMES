const fs = require('fs');
const XLSX = require('xlsx');

// 1. Parse Signature from PDF
const rawText = fs.readFileSync('catalog_dump.txt', 'utf-8');
const lines = rawText.split('\n');

const products = [];
let globalIdCounter = 1;

// PHASE 1: SIGNATURE (PDF Lines 1-roughly 70)
// We only want the first 34 items verified previously.
// We strictly parse names "Pink Baby" etc.

let signatureCount = 0;
let pendingSig = null;

function parsePrices(str) {
    const matches = str.match(/(\d{2,})\s*AED/g);
    if (!matches) return [];
    return matches.map(p => parseInt(p.replace(/AED|\s/g, '')));
}

// Helper to add variants
function addSignatureVariants(product, prices) {
    const sizes = ['100ml', '250ml', '500ml', '1Kg'];
    prices.forEach((p, i) => {
        if (i < 4) product.variants.push({ size: sizes[i], price: p, category: 'Economy' });
    });
}

for (let i = 0; i < 200; i++) { // Only scan head for Signature
    const line = lines[i].trim();
    if (!line) continue;
    if (line.includes('100g') && line.includes('250g')) continue; // Header

    // Stop if we hit the "Classic" merged lines (AB SHAMAD...)
    // AB SHAMAD starts with ID 1.
    if (line.match(/^1\s*-\s*AB/)) break;

    // Split Line Price for Signature
    if (line.match(/^\d+\s*AED/)) {
        if (pendingSig) {
            const prices = parsePrices(line);
            addSignatureVariants(pendingSig, prices);
            products.push(pendingSig);
            pendingSig = null;
            signatureCount++;
            if (signatureCount >= 34) break; // Strict limit based on User verification
        }
    }
    // Name Line
    else {
        const nameMatch = line.match(/^(\d+)\s*(.+)$/);
        if (nameMatch) {
            if (pendingSig) products.push(pendingSig); // Flush
            pendingSig = {
                id: (globalIdCounter++).toString(),
                originalId: nameMatch[1],
                name: nameMatch[2].trim(),
                variants: [],
                collectionTag: 'Signature',
                description: "Part of Zaara's exclusive Signature Collection.",
                imageUrl: "/images/bottle-black.png",
                notes: { top: "Varied", heart: "Composition", base: "Extract" }
            };
        }
    }
}

console.log(`Parsed ${products.length} Signature items from PDF.`);

// PHASE 2: CLASSICS (From Excel)
const workbook = XLSX.readFile('Classics.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Row 0=Header, 1=Subheader. Start at Row 2.
let classicCount = 0;
for (let i = 2; i < excelData.length; i++) {
    const row = excelData[i];
    if (!row || !row[1]) continue; // Skip empty rows

    // Columns: 0=SL, 1=Name, 2-5=Eco, 6-9=Ins, 10-13=Ide
    const name = row[1];

    const newProduct = {
        id: (globalIdCounter++).toString(),
        originalId: row[0] ? row[0].toString() : '0',
        name: name,
        variants: [],
        collectionTag: 'Classic',
        description: "A timeless favorite from the Zaara Classics collection.",
        imageUrl: "/images/bottle-yellow.png", // Classics have all 3 categories, default to Economy
        notes: { top: "Varied", heart: "Composition", base: "Extract" }
    };

    const prices = row.slice(2); // Prices start at col 2

    // Eco (Cols 2,3,4,5)
    if (prices[0]) newProduct.variants.push({ size: '100ml', price: prices[0], category: 'Economy' });
    if (prices[1]) newProduct.variants.push({ size: '250ml', price: prices[1], category: 'Economy' });
    if (prices[2]) newProduct.variants.push({ size: '500ml', price: prices[2], category: 'Economy' });
    if (prices[3]) newProduct.variants.push({ size: '1Kg', price: prices[3], category: 'Economy' });

    // Ins (Cols 6,7,8,9) -> indices 4,5,6,7
    if (prices[4]) newProduct.variants.push({ size: '100ml', price: prices[4], category: 'Inspired' });
    if (prices[5]) newProduct.variants.push({ size: '250ml', price: prices[5], category: 'Inspired' });
    if (prices[6]) newProduct.variants.push({ size: '500ml', price: prices[6], category: 'Inspired' });
    if (prices[7]) newProduct.variants.push({ size: '1Kg', price: prices[7], category: 'Inspired' });

    // Ide (Cols 10,11,12,13) -> indices 8,9,10,11
    if (prices[8]) newProduct.variants.push({ size: '100ml', price: prices[8], category: 'Identical' });
    if (prices[9]) newProduct.variants.push({ size: '250ml', price: prices[9], category: 'Identical' });
    if (prices[10]) newProduct.variants.push({ size: '500ml', price: prices[10], category: 'Identical' });
    if (prices[11]) newProduct.variants.push({ size: '1Kg', price: prices[11], category: 'Identical' });

    products.push(newProduct);
    classicCount++;
}

console.log(`Parsed ${classicCount} Classic items from Excel.`);

// PHASE 3: TOP QUALITY (From PDF Tail)
// Detect section start
let topQualityFound = false;
let topQualityCount = 0;

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    if (line.includes('SL NO') && line.includes('Designer') && line.includes('1Kg')) {
        topQualityFound = true;
        return;
    }

    if (topQualityFound) {
        const match = line.match(/^(\d+)\s*(.+?)\s*(\d{2,}\s*AED.*)$/);
        if (match) {
            const priceList = parsePrices(match[3]);
            if (priceList.length > 0) {
                const newProduct = {
                    id: (globalIdCounter++).toString(),
                    originalId: match[1],
                    name: match[2].trim(),
                    variants: [],
                    collectionTag: 'Top Quality',
                    description: "Top Quality Identical essence.",
                    imageUrl: "/images/bottle-blue.png",
                    notes: { top: "Varied", heart: "Composition", base: "Extract" }
                };
                const sizes = ['1Kg', '500ml', '250ml'];
                priceList.forEach((p, i) => {
                    if (i < 3) newProduct.variants.push({ size: sizes[i], price: p, category: 'Identical' });
                });
                products.push(newProduct);
                topQualityCount++;
            }
        }
    }
});

console.log(`Parsed ${topQualityCount} Top Quality items from PDF.`);

console.log('Total Products:', products.length);

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2), 'utf-8');
