/**
 * Pre-render script for GitHub Pages static deployment.
 *
 * Strategy: Since TanStack Start with Cloudflare preset generates SSR code
 * that runs on Workers, we create a static SPA entry point that loads the
 * client-side bundles. TanStack Router handles routing client-side.
 *
 * This script:
 * 1. Creates a minimal index.html that loads the client JS
 * 2. Copies it as 404.html for GitHub Pages SPA fallback
 */
import { readdir, copyFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DIST_CLIENT = resolve(__dirname, "../dist/client");
const DIST_STATIC = resolve(__dirname, "../dist/prerendered");

async function findEntryScript(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.startsWith("index-") && entry.name.endsWith(".js")) {
      return entry.name;
    }
  }
  // Recurse into subdirectories
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sub = await findEntryScript(resolve(dir, entry.name));
      if (sub) return `${entry.name}/${sub}`;
    }
  }
  return null;
}

async function findCSSFiles(dir, prefix = "") {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith(".css")) {
      results.push(prefix ? `${prefix}/${entry.name}` : entry.name);
    } else if (entry.isDirectory()) {
      const sub = await findCSSFiles(full, prefix ? `${prefix}/${entry.name}` : entry.name);
      results.push(...sub);
    }
  }
  return results;
}

async function main() {
  console.log("🔨 Pre-rendering static HTML for GitHub Pages...\n");

  // Find client entry JS
  const assetsDir = resolve(DIST_CLIENT, "assets");
  const entryScript = await findEntryScript(assetsDir);
  console.log(`📦 Client entry: ${entryScript || "NOT FOUND"}`);

  // Find CSS files
  const cssFiles = await findCSSFiles(assetsDir);
  console.log(`🎨 CSS files: ${cssFiles.length} found`);

  // Build HTML with discovered assets
  const cssLinks = cssFiles
    .map((f) => `    <link rel="stylesheet" href="/assets/${f}">`)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Manual Operacional · PAM — Duegetec</title>
    <meta name="description" content="Documentação técnica para usuários finais da operação PAM integrada ao Autodesk Construction Cloud." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
${cssLinks}
    <script type="module" src="/assets/${entryScript}"></script>
    <style>
      /* Prevent FOUC — hide content until JS loads */
      body > div:first-of-type { opacity: 0; transition: opacity 0.15s; }
      body.hydrated > div:first-of-type { opacity: 1; }
    </style>
    <script>
      // SPA routing: redirect 404.html → index.html with path preserved
      (function() {
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
          const redirect = sessionStorage.redirect;
          delete sessionStorage.redirect;
          if (redirect && redirect !== window.location.href) {
            history.replaceState(null, null, redirect);
          }
        }
        // Mark hydrated once React takes over
        document.addEventListener('DOMContentLoaded', function() {
          document.body.classList.add('hydrated');
        });
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  // Create output directory
  await mkdir(DIST_STATIC, { recursive: true });

  // Write index.html
  const indexPath = resolve(DIST_STATIC, "index.html");
  await writeFile(indexPath, html, "utf-8");
  console.log(`✅ Written: ${indexPath}`);

  // 404.html for GitHub Pages SPA routing
  // Uses sessionStorage trick to preserve the original path
  const html404 = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Manual Operacional · PAM — Duegetec</title>
    <meta name="description" content="Documentação técnica para usuários finais da operação PAM integrada ao Autodesk Construction Cloud." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
${cssLinks}
    <script type="module" src="/assets/${entryScript}"></script>
    <style>
      body > div:first-of-type { opacity: 0; transition: opacity 0.15s; }
      body.hydrated > div:first-of-type { opacity: 1; }
    </style>
    <script>
      // GitHub Pages SPA redirect trick:
      // Store the intended path and redirect to root
      (function() {
        var path = window.location.pathname;
        if (path !== '/404.html') {
          sessionStorage.redirect = path;
          window.location.replace('/');
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  const notFoundPath = resolve(DIST_STATIC, "404.html");
  await writeFile(notFoundPath, html404, "utf-8");
  console.log(`✅ Written: ${notFoundPath}`);

  // .nojekyll to prevent GitHub Pages from ignoring underscore-prefixed files
  const nojekyllPath = resolve(DIST_STATIC, ".nojekyll");
  await writeFile(nojekyllPath, "", "utf-8");
  console.log(`✅ Written: ${nojekyllPath}`);

  console.log("\n🏁 Pre-render complete!");
}

main().catch((err) => {
  console.error("❌ Pre-render failed:", err);
  process.exit(1);
});
