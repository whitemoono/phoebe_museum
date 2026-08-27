const fs = require("fs");
const css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");
const idx = css.indexOf(".navlinks a:hover");
if (idx >= 0) {
  console.log("Found at index:", idx);
  console.log("Context (300 chars):");
  console.log(JSON.stringify(css.substring(idx, idx + 300)));
} else {
  console.log("Not found");
}