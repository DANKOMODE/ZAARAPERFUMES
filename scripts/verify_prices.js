const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../src/data/products.json');
const EXCEL_PATH = path.join(__dirname, '../Classics.xlsx');

function verifyPrices() {
    console.log('Loading data...');
    const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Map Excel data by SL NO (Column 0)
    // Row 0 and 1 are headers. Data starts at Row 2.
    const excelMap = new Map();
    excelData.slice(2).forEach(row => {
        const id = row[0];
        if (id) {
            excelMap.set(String(id), row);
        }
    });

    console.log(`Loaded ${products.length} products from JSON`);
    console.log(`Loaded ${excelMap.size} rows from Excel`);

    let discrepancies = 0;
    const issues = [];

    products.forEach(product => {
        const excelRow = excelMap.get(String(product.originalId));
        if (!excelRow) {
            // console.warn(`Product ${product.id} (Original ID: ${product.originalId}) not found in Excel`);
            return;
        }

        product.variants.forEach(variant => {
            let expectedPrice = null;
            let colIndex = -1;

            // Map Size/Category to Column
            // Economy: 2-5 (100, 250, 500, 1kg)
            // Inspired: 6-9
            // Identical: 10-13

            const is100 = variant.size === '100ml' || variant.size === '100g';
            const is250 = variant.size === '250ml' || variant.size === '250g';
            const is500 = variant.size === '500ml' || variant.size === '500g';
            const is1kg = variant.size === '1Kg' || variant.size === '1kg';

            let baseCol = -1;
            if (variant.category === 'Economy') baseCol = 2;
            else if (variant.category === 'Inspired') baseCol = 6;
            else if (variant.category === 'Identical') baseCol = 10;

            if (baseCol !== -1) {
                if (is100) colIndex = baseCol;
                else if (is250) colIndex = baseCol + 1;
                else if (is500) colIndex = baseCol + 2;
                else if (is1kg) colIndex = baseCol + 3;
            }

            if (colIndex !== -1) {
                expectedPrice = excelRow[colIndex];
            }

            if (expectedPrice !== undefined && expectedPrice !== null) {
                // Ensure partial matches or numbers are handled
                const priceNum = parseFloat(expectedPrice);
                if (priceNum !== variant.price) {
                    issues.push({
                        id: product.id,
                        name: product.name,
                        originalId: product.originalId,
                        variant: `${variant.category} ${variant.size}`,
                        jsonPrice: variant.price,
                        excelPrice: priceNum
                    });
                    discrepancies++;
                }
            } else {
                // console.warn(`Could not find price in Excel for ${product.name} ${variant.category} ${variant.size}`);
            }
        });
    });

    if (issues.length > 0) {
        console.log('\nFound Discrepancies:');
        issues.forEach(issue => {
            console.log(`[${issue.name}] (ID: ${issue.originalId}) ${issue.variant}: JSON=${issue.jsonPrice}, Excel=${issue.excelPrice}`);
        });
        console.log(`\nTotal Discrepancies: ${discrepancies}`);
    } else {
        console.log('\nNo discrepancies found!');
    }
}

verifyPrices();
