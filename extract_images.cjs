const fs = require('fs');
const html = fs.readFileSync('toit_bangalore.html', 'utf8');
const regex = /(https?:\/\/[^\s\"\'\>]+?\.(?:jpg|png|webp|jpeg|gif))/gi;
const matches = html.match(regex) || [];
console.log(Array.from(new Set(matches)).join('\n'));
