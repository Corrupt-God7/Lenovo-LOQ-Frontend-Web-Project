const fs = require('fs');
const path = require('path');

// Move project files from lenovo-loq to root
const sourceDir = path.join(__dirname, 'lenovo-loq');
const targetDir = __dirname;
const assetsDir = path.join(__dirname, '_assets');
const publicImagesDir = path.join(__dirname, 'public', 'images', 'loq-sequence');

async function main() {
  console.log('Starting reorganization...');

  // 1. Move project files
  if (fs.existsSync(sourceDir)) {
    console.log('Moving project files...');
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
      if (file === '.git') continue; // Skip git if any
      const src = path.join(sourceDir, file);
      const dest = path.join(targetDir, file);
      // Skip if dest exists and is important?
      // For now, overwrite or skip. source has the fresh app.
      try {
        fs.renameSync(src, dest);
      } catch (e) {
          // If cross-device or permission error, try copy/delete
          fs.cpSync(src, dest, { recursive: true, force: true });
          fs.rmSync(src, { recursive: true, force: true });
      }
    }
    // Remove the empty source directory
    try { fs.rmdirSync(sourceDir); } catch(e) {}
  }

  // 2. Setup images
  console.log('Processing images...');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    files.forEach(file => {
      // expected: ezgif-frame-001.jpg
      const match = file.match(/ezgif-frame-(\d+)\.jpg/);
      if (match) {
        const num = parseInt(match[1], 10);
        const newName = `${num}.jpg`;
        fs.cpSync(path.join(assetsDir, file), path.join(publicImagesDir, newName));
      }
    });
    // Cleanup assets dir
    // fs.rmSync(assetsDir, { recursive: true, force: true }); // Keep for safety for now
  }
  
  console.log('Done.');
}

main();
