const fs = require('fs');

const rawText = fs.readFileSync('catalog_dump.txt', 'utf-8');
const lines = rawText.split('\n');

const products = [];

lines.forEach(line => {
    line = line.trim();

    // Look for the first index where "...[digits]AED" appears
    // We look for the pattern: at least 2 digits followed by AED
    const priceStartMatch = line.match(/(\d{2,})AED/);

    if (priceStartMatch && priceStartMatch.index > 0) {
        // split index is the start of the digits
        const splitIndex = priceStartMatch.index;

        let namePart = line.substring(0, splitIndex).trim();
        const pricePart = line.substring(splitIndex).trim();

        // Extract ID from namePart (starts with digits)
        let id = '';
        const idMatch = namePart.match(/^(\d+)/);
        if (idMatch) {
            id = idMatch[1];
            namePart = namePart.substring(id.length).trim();
        }

        // Extract prices
        const priceMatches = pricePart.match(/(\d+)AED/g);

        if (priceMatches && priceMatches.length >= 12) {
            const prices = priceMatches.map(p => parseInt(p.replace('AED', '')));

            products.push({
                id,
                name: namePart,
                economy: prices.slice(0, 4),
                inspired: prices.slice(4, 8),
                identical: prices.slice(8, 12)
            });
        }
    }
});

console.log(JSON.stringify(products, null, 2));
