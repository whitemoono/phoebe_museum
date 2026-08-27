const fs = require("fs");
let css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");

// Find the line after .navlinks a:hover rule and insert .nav-right
const anchor = ".navlinks a:hover{color:#2c2c2c;background:rgba(0,0,0,.05)}";
const navRightCSS = "\n.nav-right{display:flex;flex-direction:row;align-items:center;gap:10px;flex-shrink:0;position:relative;z-index:1}";

if (!css.includes(".nav-right")) {
  css = css.replace(anchor, anchor + navRightCSS);
  fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", css, "utf8");
  console.log("Added .nav-right CSS");
} else {
  console.log(".nav-right already exists");
}