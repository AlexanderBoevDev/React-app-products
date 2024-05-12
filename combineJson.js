const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const outputFile = path.join(__dirname, 'src', 'data', 'db.json');

const files = ['pages.json', 'pricePlans.json', 'products.json'];
const db = {};

files.forEach(file => {
	const data = fs.readFileSync(path.join(dataDir, file));
	db[file.split('.')[0]] = JSON.parse(data);
});

fs.writeFileSync(outputFile, JSON.stringify(db, null, 2));
console.log('db.json has been created!');
