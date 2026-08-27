const fs = require("fs");
let css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");

// Replace nav-right styles to ensure horizontal layout
css = css.replace(
  ".nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0;position:relative;z-index:1}",
  ".nav-right{display:flex;flex-direction:row;align-items:center;gap:10px;flex-shrink:0;position:relative;z-index:1;white-space:nowrap}"
);

fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", css, "utf8");
console.log("Fixed nav-right to horizontal");