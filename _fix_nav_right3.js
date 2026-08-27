const fs = require("fs");
let css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");

const search = ".navlinks a:hover {\r\n  color: #2c2c2c;\r\n  background: rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n/* Hero Section */";

const replace = ".navlinks a:hover {\r\n  color: #2c2c2c;\r\n  background: rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.nav-right {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n  gap: 10px;\r\n  flex-shrink: 0;\r\n  position: relative;\r\n  z-index: 1;\r\n}\r\n\r\n/* Hero Section */";

if (css.includes(search)) {
  css = css.replace(search, replace);
  fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", css, "utf8");
  console.log("Fixed .nav-right CSS");
} else {
  console.log("Search pattern not found - trying with \\n");
  // Try with \n
  const search2 = search.replace(/\r\n/g, "\n");
  const replace2 = replace.replace(/\r\n/g, "\n");
  if (css.includes(search2)) {
    css = css.replace(search2, replace2);
    fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", css, "utf8");
    console.log("Fixed .nav-right CSS (with \\n)");
  } else {
    console.log("Still not found");
  }
}