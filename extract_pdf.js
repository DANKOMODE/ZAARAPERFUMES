const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('catalog.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('catalog_dump.txt', data.text, 'utf-8');
    console.log("Extraction complete.");
}).catch(function (error) {
    console.error(error);
});
