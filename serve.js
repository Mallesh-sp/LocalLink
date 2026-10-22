const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;

// Resolve directories
const ROOT_DIR = __dirname;
const PROJECT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function findFile(reqPath) {
  let decodedPath = decodeURIComponent(reqPath);
  
  // Normalize path
  if (decodedPath === '/' || decodedPath === '') {
    decodedPath = '/index.html';
  }

  // Remove leading "/LOCAL LINK" if present
  if (decodedPath.startsWith('/LOCAL LINK/') || decodedPath === '/LOCAL LINK') {
    decodedPath = decodedPath.replace('/LOCAL LINK', '') || '/index.html';
  }

  // Potential search locations
  const candidates = [
    path.join(PROJECT_DIR, decodedPath),
    path.join(PROJECT_DIR, decodedPath + '.html'),
    path.join(ROOT_DIR, decodedPath),
    path.join(ROOT_DIR, decodedPath + '.html')
  ];

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        const stat = fs.statSync(candidate);
        if (stat.isFile()) {
          return candidate;
        } else if (stat.isDirectory()) {
          const indexFile = path.join(candidate, 'index.html');
          if (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) {
            return indexFile;
          }
        }
      }
    } catch {
      // ignore
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const filePath = findFile(parsedUrl.pathname);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;">
      <h1>404 - Page Not Found</h1>
      <p>Requested URL: <code>${parsedUrl.pathname}</code></p>
      <a href="/" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Go to LocalLink Home</a>
    </body></html>`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${err.code}`);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localUrl = `http://localhost:${PORT}`;
  console.log('='.repeat(55));
  console.log(` LocalLink Server is running!`);
  console.log(` Local URL: ${localUrl}`);
  console.log(` Root Directory: ${PROJECT_DIR}`);
  console.log('='.repeat(55));

  // Automatically open browser on Windows
  exec(`start ${localUrl}`, (err) => {
    if (err) {
      // non-fatal
    }
  });
});
