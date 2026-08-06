/**
 * Rasteriza un HTML de scripts/ a PNG con Chrome o Edge en modo headless.
 * Sin dependencias npm: usa el navegador que ya está instalado en el sistema.
 *
 *   npm run og   ->  scripts/og-source.html  -> public/og.png       (1200x630)
 *   npm run ig   ->  scripts/ig-source.html  -> public/social/instagram.png (1080x1350)
 *
 * También se puede llamar directo con argumentos propios:
 *   node scripts/generate-og.mjs <source.html> <output.png> [width] [height]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [sourceArg, outputArg, widthArg, heightArg] = process.argv.slice(2);
const source = resolve(root, sourceArg ?? 'scripts/og-source.html');
const output = resolve(root, outputArg ?? 'public/og.png');
const width = widthArg ?? '1200';
const height = heightArg ?? '630';

const CANDIDATES =
  process.platform === 'win32'
    ? [
        'C:/Program Files/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
      ]
    : process.platform === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        ]
      : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];

const browser = process.env.CHROME_PATH ?? CANDIDATES.find((p) => existsSync(p));

if (!browser) {
  console.error(
    'No encontré Chrome ni Edge. Instala uno o exporta CHROME_PATH con la ruta al ejecutable.'
  );
  process.exit(1);
}

mkdirSync(dirname(output), { recursive: true });

execFileSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    // Da tiempo a que carguen la fuente Kanit y el retrato antes de capturar
    '--virtual-time-budget=6000',
    `--screenshot=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: 'inherit' }
);

console.log(`Imagen generada en ${output}`);
