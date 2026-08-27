const fs = require("fs");
const css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");

// Find all nav-related rules
const lines = css.split("\n");
let inNav = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(".nav") || lines[i].includes("nav-right") || lines[i].includes("navlinks")) {
    console.log("Line " + (i+1) + ": " + lines[i].substring(0, 120));
  }
}