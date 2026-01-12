const pdf = require('pdf-parse');
console.log('Type:', typeof pdf);
console.log('Is Function:', typeof pdf === 'function');
console.log('Keys:', Object.keys(pdf));
if (typeof pdf === 'object') {
    console.log('Inspect:', pdf);
}
