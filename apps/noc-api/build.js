import { build } from "esbuild";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildApp() {
  try {
    await build({
      entryPoints: [join(__dirname, "src/worker.js")],
      bundle: true,
      outfile: "dist/worker.js",
      format: "esm",
      platform: "neutral",
      target: "es2020",
      minify: true,
      sourcemap: true,
      conditions: ["worker", "browser"],
    });
    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildApp();
