const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../src/data/products.json');
const EXCEL_PATH = path.join(__dirname, '../Classics.xlsx');

function fixPrices() {
    console.log('Loading data...');
    const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const excelMap = new Map();
    excelData.slice(2).forEach(row => {
        const id = row[0];
        if (id) {
            excelMap.set(String(id), row);
        }
    });

    let updates = 0;

    products.forEach(product => {
        const excelRow = excelMap.get(String(product.originalId));
        if (!excelRow) return;

        product.variants.forEach(variant => {
            let colIndex = -1;
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
                const excelPrice = excelRow[colIndex];
                if (excelPrice !== undefined && excelPrice !== null) {
                    const priceNum = parseFloat(excelPrice);
                    if (priceNum !== variant.price && !isNaN(priceNum)) {
                        variant.price = priceNum;
                        updates++;
                    }
                }
            }
        });
    });

    console.log(`Updated ${updates} variant prices.`);
    fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
    console.log('Saved products.json');
}

fixPrices();
