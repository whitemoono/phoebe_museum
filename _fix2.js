const fs = require("fs");
let content = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\page.tsx", "utf8");
content = content.replace(
  "transition: opacity 0.3s ease s, transform 0.3s ease s,",
  "transition: 'opacity 0.3s ease ' + (i * 0.05) + 's, transform 0.3s ease ' + (i * 0.05) + 's',"
);
fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\page.tsx", content, "utf8");
console.log("Fixed line 108");