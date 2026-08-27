const fs = require("fs");
let css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");

// Insert .nav-right after the .navlinks a:hover closing brace
const search = `.navlinks a:hover {
  color: #2c2c2c;
  background: rgba(0, 0, 0, 0.05);
}

/* Hero Section */`;

const replace = `.navlinks a:hover {
  color: #2c2c2c;
  background: rgba(0, 0, 0, 0.05);
}

.nav-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

/* Hero Section */`;

if (css.includes(search)) {
  css = css.replace(search, replace);
  fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", css, "utf8");
  console.log("Fixed .nav-right CSS");
} else {
  console.log("Search pattern not found");
}