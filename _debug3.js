const fs = require("fs");
const css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");
const lines = css.split("\n");
for (let i = 125; i < 135; i++) {
  console.log("Line " + (i+1) + ": [" + lines[i] + "]");
}