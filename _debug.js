const fs = require("fs");

// Check Navbar
const nav = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\components\\Navbar.tsx", "utf8");
console.log("=== Navbar nav-right section ===");
const navRightMatch = nav.match(/nav-right[\s\S]{0,500}/);
if (navRightMatch) console.log(navRightMatch[0]);

// Check CSS
const css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");
const navRightCss = css.match(/\.nav-right[\s\S]{0,300}/);
console.log("\n=== CSS .nav-right ===");
if (navRightCss) console.log(navRightCss[0]);