const fs = require("fs");
let css = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", "utf8");

// Add nav-right styles if not present
if (!css.includes(".nav-right")) {
  const navRightCSS = `
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
`;
  // Insert after .navlinks a:hover rule
  css = css.replace(
    ".navlinks a:hover{color:#2c2c2c;background:rgba(0,0,0,.05)}",
    ".navlinks a:hover{color:#2c2c2c;background:rgba(0,0,0,.05)}" + navRightCSS
  );
  fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\globals.css", css, "utf8");
  console.log("Added .nav-right CSS");
} else {
  console.log(".nav-right CSS already exists");
}