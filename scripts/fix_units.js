const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '../src/data/products.json');

function fixUnits() {
    console.log('Loading data...');
    const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));

    let updates = 0;

    products.forEach(product => {
        product.variants.forEach(variant => {
            if (variant.size.includes('ml')) {
                const oldSize = variant.size;
                variant.size = variant.size.replace('ml', 'g');
                // console.log(`Changed ${oldSize} to ${variant.size} for product ${product.id}`);
                updates++;
            }
        });
    });

    console.log(`Updated ${updates} variant sizes.`);
    fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
    console.log('Saved products.json');
}

fixUnits();
