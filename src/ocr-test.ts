import { readFileSync } from "node:fs";
import { TesseractEngine } from "./modules/ocr/tesseract.engine.js";
import "dotenv/config";

const caminho = process.argv[2];
if (!caminho) {
  console.error("Uso: npx tsx src/ocr-test.ts caminho/da/imagem.png");
  process.exit(1);
}

const engine = new TesseractEngine();
try {
  const imagem = readFileSync(caminho);

  console.time("1a chamada");
  console.log(await engine.extractText(imagem));
  console.timeEnd("1a chamada");

  console.time("2a chamada");
  await engine.extractText(imagem);
  console.timeEnd("2a chamada");
} finally {
  await engine.terminate();
}