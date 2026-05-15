const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(
    path.join(__dirname, "../../_docx_extract/extracted_text.txt"),
    "utf8"
  )
  .split(/\r?\n/);

/** 1-based inclusive start, 1-based inclusive end */
function sliceDoc(startLine, endLine) {
  return lines.slice(startLine - 1, endLine).join("\n");
}

const map = {
  "obligations-employeur-rse-prevention-risques-duerp": sliceDoc(477, 587),
  "rediger-contrat-travail-cdi-clauses-obligatoires": sliceDoc(589, 684),
  "comment-contester-sanction-disciplinaire-avertissement": sliceDoc(685, 802),
  "recrutement-salarie-etranger-demarches-employeur": sliceDoc(803, 950),
  "rupture-conventionnelle-procedure-indemnites-2024": sliceDoc(951, 1175),
};

let out = `/** Contenu article blog — extrait mot pour mot de _docx_extract/extracted_text.txt (document client). */\n\n`;
out += `export const BLOG_ARTICLE_DOC_BODIES: Record<string, string> = {\n`;
for (const [k, v] of Object.entries(map)) {
  out += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
out += `};\n`;

const outPath = path.join(__dirname, "../src/content/blog-article-doc-bodies.ts");
fs.writeFileSync(outPath, out, "utf8");
console.log("Wrote", outPath);
