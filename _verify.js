const fs = require("fs");
const css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");
const match = css.match(/\.nav-right[\s\S]{0,200}/);
console.log(match ? match[0] : "NOT FOUND");