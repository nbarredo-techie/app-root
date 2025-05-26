const fs = require("fs");

const content = fs.readFileSync("src/index.ejs", "utf8");
const match = content.match(
  /<script type="injector-importmap">\s*({[\s\S]*?})\s*<\/script>/
);

if (match) {
  try {
    const json = JSON.parse(match[1]);
    console.log("✅ JSON is valid!");
    console.log("✅ Imports count:", Object.keys(json.imports).length);
    console.log("✅ Scopes count:", Object.keys(json.scopes).length);
    console.log(
      "✅ React version:",
      json.imports.react.includes("19.0.0") ? "19.0.0" : "Other"
    );
  } catch (e) {
    console.log("❌ JSON error:", e.message);
    process.exit(1);
  }
} else {
  console.log("❌ Could not find import map script");
  process.exit(1);
}
