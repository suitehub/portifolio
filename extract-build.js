import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { createExtractorFromData } from "node-unrar-js";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const APPS_DIR = path.join(PUBLIC_DIR, "apps");

// Helper to slugify filenames
function getSlug(filename) {
  return filename
    .replace(/\.(zip|rar)$/i, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Prettify slug or filename for user display
function prettifyName(filename) {
  const base = filename.replace(/\.(zip|rar)$/i, "");
  return base
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Recursively find index.html
function findIndexHtml(dir) {
  try {
    const files = fs.readdirSync(dir);
    if (files.includes("index.html")) {
      return "index.html";
    }
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

async function extractRarArchive(archivePath, destDir) {
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

async function build() {
  console.log("Preparing public directories...");
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPS_DIR)) {
    fs.mkdirSync(APPS_DIR, { recursive: true });
  }

  const rootFiles = fs.readdirSync(process.cwd());
  const archives = rootFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".zip" || ext === ".rar";
  });

  const discoveredApps = [];

  for (const archive of archives) {
    const archivePath = path.join(process.cwd(), archive);
    const stats = fs.statSync(archivePath);
    if (stats.isDirectory() || stats.size < 100) {
      continue;
    }

    const slug = getSlug(archive);
    const destDir = path.join(APPS_DIR, slug);
    const isZip = path.extname(archive).toLowerCase() === ".zip";

    console.log(`Extracting archive: ${archive} -> slug: ${slug}`);
    try {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        if (isZip) {
          const zip = new AdmZip(archivePath);
          zip.extractAllTo(destDir, true);
        } else {
          await extractRarArchive(archivePath, destDir);
        }
        console.log(`Successfully extracted ${archive}`);
      } else {
        console.log(`Target already exists for ${slug}, skipping unzip.`);
      }

      const relativeIndexPath = findIndexHtml(destDir);
      if (relativeIndexPath) {
        discoveredApps.push({
          id: slug,
          name: prettifyName(archive),
          archiveName: archive,
          entryPath: `apps/${slug}/${relativeIndexPath.replace(/\\/g, "/")}`,
          type: isZip ? "zip" : "rar",
          size: stats.size
        });
        console.log(`Found entry: /apps/${slug}/${relativeIndexPath}`);
      } else {
        console.warn(`Could not find index.html in ${slug}`);
      }
    } catch (err) {
      console.error(`Failed to process ${archive}:`, err);
    }
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, "apps.json"), JSON.stringify(discoveredApps, null, 2));
  console.log(`Successfully generated public/apps.json with ${discoveredApps.length} apps!`);
}

build().catch(console.error);
