const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const breakpoints = [
    { width: 390, height: 1200, name: '390px-mobile' },
    { width: 768, height: 1200, name: '768px-tablet' },
    { width: 1440, height: 1200, name: '1440px-desktop' }
  ];

  const screenshotsDir = path.join(__dirname, '.claude', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  for (const bp of breakpoints) {
    const page = await browser.newPage();
    await page.setViewport({ width: bp.width, height: bp.height });

    try {
      await page.goto('http://localhost:8000/services.html', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for images to load
      await page.waitForFunction(() => {
        const images = Array.from(document.querySelectorAll('img[src*="assets/services"]'));
        return images.every(img => img.complete && img.naturalHeight > 0);
      }, { timeout: 10000 }).catch(() => console.log(`Warning: images may not have fully loaded at ${bp.name}`));

      const filename = path.join(screenshotsDir, `services-${bp.name}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`✅ Screenshot saved: ${filename}`);
    } catch (error) {
      console.error(`❌ Error at ${bp.name}: ${error.message}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\n✅ All screenshots complete!');
})();
