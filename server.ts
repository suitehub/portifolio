import express from "express";
import path from "path";
import fs from "fs";
import AdmZip from "adm-zip";
import { createExtractorFromData } from "node-unrar-js";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const EXTRACTED_DIR = path.join(process.cwd(), "extracted_apps");

interface AppItem {
  id: string;
  name: string;
  archiveName: string;
  entryPath: string; // URL path to index.html (e.g. /apps/slug/index.html)
  type: "zip" | "rar";
  size: number;
}

// Global in-memory list of discovered apps
let discoveredApps: AppItem[] = [];

// Helper to slugify filenames
function getSlug(filename: string): string {
  return filename
    .replace(/\.(zip|rar)$/i, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Prettify slug or filename for user display
function prettifyName(filename: string): string {
  const base = filename.replace(/\.(zip|rar)$/i, "");
  // Replace dashes/underscores with spaces, capitalize words
  return base
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Recursively find index.html in a directory
function findIndexHtml(dir: string): string | null {
  try {
    const files = fs.readdirSync(dir);
    // Prioritize direct index.html
    if (files.includes("index.html")) {
      return "index.html";
    }
    // Search subdirectories
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const found = findIndexHtml(fullPath);
        if (found) {
          return path.join(file, found);
        }
      }
    }
  } catch (err) {
    console.error(`Error searching index.html in ${dir}:`, err);
  }
  return null;
}

// Function to extract a RAR archive
async function extractRarArchive(archivePath: string, destDir: string) {
  const buf = fs.readFileSync(archivePath);
  const extractor = await createExtractorFromData({ data: buf });
  const list = extractor.getFileList();
  const fileHeaders = [...list.fileHeaders];
  
  const extracted = extractor.extract({ files: fileHeaders.map(h => h.name) });
  for (const file of extracted.files) {
    if (file.fileHeader.flags.directory) {
      fs.mkdirSync(path.join(destDir, file.fileHeader.name), { recursive: true });
    } else {
      const filePath = path.join(destDir, file.fileHeader.name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      if (file.extraction) {
        fs.writeFileSync(filePath, file.extraction);
      }
    }
  }
}

// Master extraction function run at startup
async function extractAllArchives() {
  console.log("Starting archive extraction...");
  
  // Ensure target extraction directory exists
  if (!fs.existsSync(EXTRACTED_DIR)) {
    fs.mkdirSync(EXTRACTED_DIR, { recursive: true });
  }

  const rootFiles = fs.readdirSync(process.cwd());
  const archives = rootFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".zip" || ext === ".rar";
  });

  const tempApps: AppItem[] = [];

  for (const archive of archives) {
    const archivePath = path.join(process.cwd(), archive);
    const stats = fs.statSync(archivePath);
    
    // Skip empty files or directories
    if (stats.isDirectory() || stats.size < 100) {
      console.log(`Skipping empty or invalid archive: ${archive} (${stats.size} bytes)`);
      continue;
    }

    const slug = getSlug(archive);
    const destDir = path.join(EXTRACTED_DIR, slug);
    const isZip = path.extname(archive).toLowerCase() === ".zip";

    console.log(`Processing archive: ${archive} -> slug: ${slug}`);

    try {
      // Only extract if it doesn't already exist to speed up restarts
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        if (isZip) {
          const zip = new AdmZip(archivePath);
          zip.extractAllTo(destDir, true);
          console.log(`Successfully extracted ZIP: ${archive}`);
        } else {
          await extractRarArchive(archivePath, destDir);
          console.log(`Successfully extracted RAR: ${archive}`);
        }
      } else {
        console.log(`Extraction target already exists for ${slug}, skipping unzip.`);
      }

      // Find index.html relative path
      const relativeIndexPath = findIndexHtml(destDir);
      if (relativeIndexPath) {
        tempApps.push({
          id: slug,
          name: prettifyName(archive),
          archiveName: archive,
          entryPath: `/apps/${slug}/${relativeIndexPath.replace(/\\/g, "/")}`,
          type: isZip ? "zip" : "rar",
          size: stats.size
        });
        console.log(`Found app entry point: /apps/${slug}/${relativeIndexPath}`);
      } else {
        console.warn(`Could not find index.html for extracted app: ${slug}`);
      }
    } catch (err) {
      console.error(`Failed to extract or process ${archive}:`, err);
    }
  }

  discoveredApps = tempApps;
  console.log(`Extraction complete. Discovered ${discoveredApps.length} interactive app(s).`);
}

async function startServer() {
  // Extract all user archives first
  await extractAllArchives();

  // API endpoints
  app.get("/api/apps", (req, res) => {
    res.json({
      success: true,
      apps: discoveredApps
    });
  });

  // Serve extracted apps under /apps
  app.use("/apps", express.static(EXTRACTED_DIR));

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start full-stack server:", err);
});
