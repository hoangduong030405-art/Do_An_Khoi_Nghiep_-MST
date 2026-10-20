/**
 * Image Audit Script for Huego
 * Chạy: npm run audit:images
 * Tính năng:
 * - 10 worker đồng thời (concurrency = 10)
 * - Timeout 8 giây cho mỗi yêu cầu
 * - Hỗ trợ tiếp tục chạy nếu bị ngắt (resume từ scratch/image_audit.csv)
 * - Phân loại: ok, missing, string_error, 404, 403, timeout, not_image, empty_or_too_small, other_error
 * - Xuất CSV tại scratch/image_audit.csv
 * - In bảng tổng hợp theo trạng thái, host, danh mục
 */

const fs = require('fs');
const path = require('path');

const PLACES_FILE = path.join(__dirname, '..', 'web-hue4u', 'data', 'places_all.json');
const PUBLIC_DIR = path.join(__dirname, '..', 'web-hue4u', 'public');
const CSV_FILE = path.join(__dirname, '..', 'scratch', 'image_audit.csv');
const OVERRIDES_FILE = path.join(__dirname, '..', 'web-hue4u', 'data', 'image_overrides.json');

const CONCURRENCY = 10;
const TIMEOUT_MS = 8000;

function escapeCsv(str) {
  if (str === null || str === undefined) return '';
  const s = String(str);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function parseCsv(content) {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  if (lines.length <= 1) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    const match = raw.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    // basic split if simple
    const parts = [];
    let cur = '';
    let inQuotes = false;
    for (let c = 0; c < raw.length; c++) {
      const char = raw[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(cur);
        cur = '';
      } else {
        cur += char;
      }
    }
    parts.push(cur);
    const obj = {};
    headers.forEach((h, idx) => {
      let val = parts[idx] || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      obj[h] = val;
    });
    rows.push(obj);
  }
  return rows;
}

async function auditSingleUrl(place) {
  const url = place.coverPhotoUrl;
  const start = Date.now();

  // 1. Missing URL
  if (!url || !url.trim()) {
    return {
      id: place.id,
      vertical: place.vertical || 'unknown',
      name: place.name || '',
      url: '',
      status: 'missing',
      httpStatus: '',
      contentType: '',
      contentLength: 0,
      responseTimeMs: 0,
      error: 'No image URL provided'
    };
  }

  // 2. String errors: spaces, unencoded vietnamese accents, http instead of https
  const hasSpaces = /\s/.test(url);
  const hasNonAscii = /[^\x00-\x7F]/.test(url);
  const isHttp = url.startsWith('http://');

  if (hasSpaces || hasNonAscii || isHttp) {
    return {
      id: place.id,
      vertical: place.vertical || 'unknown',
      name: place.name || '',
      url,
      status: 'string_error',
      httpStatus: '',
      contentType: '',
      contentLength: 0,
      responseTimeMs: 0,
      error: [
        hasSpaces ? 'Contains whitespace' : '',
        hasNonAscii ? 'Contains unencoded non-ASCII/Vietnamese chars' : '',
        isHttp ? 'Uses insecure http://' : ''
      ].filter(Boolean).join('; ')
    };
  }

  // 3. Local relative URL (/images/...)
  if (url.startsWith('/')) {
    const localPath = path.join(PUBLIC_DIR, url.replace(/^\//, ''));
    const respTime = Date.now() - start;
    if (fs.existsSync(localPath)) {
      const stat = fs.statSync(localPath);
      const ext = path.extname(localPath).toLowerCase();
      const mime = ext === '.webp' ? 'image/webp' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : 'application/octet-stream';
      if (stat.size <= 2048) {
        return {
          id: place.id,
          vertical: place.vertical || 'unknown',
          name: place.name || '',
          url,
          status: 'empty_or_too_small',
          httpStatus: '200',
          contentType: mime,
          contentLength: stat.size,
          responseTimeMs: respTime,
          error: `File size too small: ${stat.size} bytes`
        };
      }
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: 'ok',
        httpStatus: '200',
        contentType: mime,
        contentLength: stat.size,
        responseTimeMs: respTime,
        error: ''
      };
    } else {
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: '404',
        httpStatus: '404',
        contentType: '',
        contentLength: 0,
        responseTimeMs: respTime,
        error: `Local file not found on disk: ${url}`
      };
    }
  }

  // 4. Remote HTTP/HTTPS URL
  try {
    let res;
    try {
      res = await fetch(url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HuegoAudit/1.0',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });
      // If HEAD is not allowed (405) or unsupported (501), retry with GET Range
      if (res.status === 405 || res.status === 501) {
        res = await fetch(url, {
          method: 'GET',
          signal: AbortSignal.timeout(TIMEOUT_MS),
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HuegoAudit/1.0',
            'Range': 'bytes=0-4096'
          }
        });
      }
    } catch (headErr) {
      if (headErr.name === 'TimeoutError' || headErr.message.includes('timeout')) {
        return {
          id: place.id,
          vertical: place.vertical || 'unknown',
          name: place.name || '',
          url,
          status: 'timeout',
          httpStatus: '',
          contentType: '',
          contentLength: 0,
          responseTimeMs: Date.now() - start,
          error: 'Connection timed out after 8s'
        };
      }
      // Retry once with GET Range on general network error
      res = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HuegoAudit/1.0',
          'Range': 'bytes=0-4096'
        }
      });
    }

    const respTime = Date.now() - start;
    const httpStatus = res.status;
    const contentType = res.headers.get('content-type') || '';
    const cl = res.headers.get('content-length');
    let contentLength = cl ? parseInt(cl, 10) : 0;

    // Check specific HTTP status codes
    if (httpStatus === 404) {
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: '404',
        httpStatus: '404',
        contentType,
        contentLength,
        responseTimeMs: respTime,
        error: 'HTTP 404 Not Found'
      };
    }
    if (httpStatus === 403) {
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: '403',
        httpStatus: '403',
        contentType,
        contentLength,
        responseTimeMs: respTime,
        error: 'HTTP 403 Forbidden (possible hotlink protection/Referer required)'
      };
    }

    if (httpStatus >= 400) {
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: 'other_error',
        httpStatus: String(httpStatus),
        contentType,
        contentLength,
        responseTimeMs: respTime,
        error: `HTTP error ${httpStatus}`
      };
    }

    // Must be image/*
    if (!contentType.toLowerCase().startsWith('image/')) {
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: 'not_image',
        httpStatus: String(httpStatus),
        contentType,
        contentLength,
        responseTimeMs: respTime,
        error: `Content-Type is not image/* (${contentType})`
      };
    }

    // Size check
    if (contentLength > 0 && contentLength <= 2048) {
      return {
        id: place.id,
        vertical: place.vertical || 'unknown',
        name: place.name || '',
        url,
        status: 'empty_or_too_small',
        httpStatus: String(httpStatus),
        contentType,
        contentLength,
        responseTimeMs: respTime,
        error: `Image size <= 2KB (${contentLength} bytes)`
      };
    }

    return {
      id: place.id,
      vertical: place.vertical || 'unknown',
      name: place.name || '',
      url,
      status: 'ok',
      httpStatus: String(httpStatus),
      contentType,
      contentLength,
      responseTimeMs: respTime,
      error: ''
    };
  } catch (err) {
    const respTime = Date.now() - start;
    const isTimeout = err.name === 'TimeoutError' || (err.message && err.message.toLowerCase().includes('timeout'));
    return {
      id: place.id,
      vertical: place.vertical || 'unknown',
      name: place.name || '',
      url,
      status: isTimeout ? 'timeout' : 'other_error',
      httpStatus: '',
      contentType: '',
      contentLength: 0,
      responseTimeMs: respTime,
      error: err.message || 'Unknown network error'
    };
  }
}

async function main() {
  console.log('=== HUEGO IMAGE AUDIT TOOL ===');
  console.log(`Places data: ${PLACES_FILE}`);
  console.log(`Output CSV:  ${CSV_FILE}`);
  console.log(`Concurrency: ${CONCURRENCY}, Timeout: ${TIMEOUT_MS / 1000}s\n`);

  if (!fs.existsSync(PLACES_FILE)) {
    console.error(`Error: Places file not found at ${PLACES_FILE}`);
    process.exit(1);
  }

  const places = JSON.parse(fs.readFileSync(PLACES_FILE, 'utf8'));
  console.log(`Loaded ${places.length} places from places_all.json.`);

  // Load existing results if resuming
  const existingMap = new Map();
  if (fs.existsSync(CSV_FILE)) {
    try {
      const prevRows = parseCsv(fs.readFileSync(CSV_FILE, 'utf8'));
      prevRows.forEach(r => {
        if (r.id && r.status) {
          existingMap.set(r.id, r);
        }
      });
      console.log(`Found existing audit results: ${existingMap.size} records previously completed.`);
    } catch (e) {
      console.warn('Could not parse existing CSV, starting fresh.');
    }
  }

  const results = [];
  const todo = [];

  places.forEach(p => {
    if (existingMap.has(p.id)) {
      results.push(existingMap.get(p.id));
    } else {
      todo.push(p);
    }
  });

  console.log(`Remaining to audit: ${todo.length} items.\n`);

  // Ensure output directory exists
  const outDir = path.dirname(CSV_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  function flushCsv() {
    const headers = ['id', 'vertical', 'name', 'url', 'status', 'httpStatus', 'contentType', 'contentLength', 'responseTimeMs', 'error'];
    const lines = [headers.join(',')];
    results.forEach(r => {
      lines.push([
        escapeCsv(r.id),
        escapeCsv(r.vertical),
        escapeCsv(r.name),
        escapeCsv(r.url),
        escapeCsv(r.status),
        escapeCsv(r.httpStatus),
        escapeCsv(r.contentType),
        escapeCsv(r.contentLength),
        escapeCsv(r.responseTimeMs),
        escapeCsv(r.error)
      ].join(','));
    });
    fs.writeFileSync(CSV_FILE, lines.join('\n'), 'utf8');
  }

  let index = 0;
  let activeWorkers = 0;
  let completedInRun = 0;

  async function worker() {
    while (index < todo.length) {
      const current = todo[index++];
      const res = await auditSingleUrl(current);
      results.push(res);
      completedInRun++;

      if (completedInRun % 50 === 0 || completedInRun === todo.length) {
        process.stdout.write(`\rProgress: ${results.length}/${places.length} (${Math.round(results.length / places.length * 100)}%) - Auditing...`);
        flushCsv();
      }
    }
  }

  if (todo.length > 0) {
    const workers = [];
    for (let i = 0; i < Math.min(CONCURRENCY, todo.length); i++) {
      workers.push(worker());
    }
    await Promise.all(workers);
    flushCsv();
    console.log(`\n\nAudit completed! Total audited: ${results.length} items.`);
  } else {
    console.log('All items already audited in CSV.');
  }

  // Generate Summaries
  const statusCounts = {};
  const hostCounts = {};
  const verticalCounts = {};

  results.forEach(r => {
    // Status
    const st = r.status || 'unknown';
    statusCounts[st] = (statusCounts[st] || 0) + 1;

    // Vertical
    const vt = r.vertical || 'unknown';
    if (!verticalCounts[vt]) {
      verticalCounts[vt] = { total: 0, ok: 0, broken: 0, missing: 0 };
    }
    verticalCounts[vt].total++;
    if (st === 'ok') verticalCounts[vt].ok++;
    else if (st === 'missing') verticalCounts[vt].missing++;
    else verticalCounts[vt].broken++;

    // Host
    let host = 'none';
    if (r.url) {
      if (r.url.startsWith('/')) {
        host = 'local (/images/...)';
      } else {
        try {
          host = new URL(r.url).host;
        } catch (e) {
          host = 'invalid_url';
        }
      }
    }
    if (!hostCounts[host]) {
      hostCounts[host] = { total: 0, ok: 0, broken: 0, missing: 0 };
    }
    hostCounts[host].total++;
    if (st === 'ok') hostCounts[host].ok++;
    else if (st === 'missing') hostCounts[host].missing++;
    else hostCounts[host].broken++;
  });

  console.log('\n======================================================');
  console.log('               BẢNG TỔNG HỢP THEO TRẠNG THÁI');
  console.log('======================================================');
  console.table(Object.keys(statusCounts).map(k => ({ 'Trạng thái': k, 'Số lượng': statusCounts[k], 'Tỷ lệ (%)': (statusCounts[k] / results.length * 100).toFixed(2) })));

  console.log('\n======================================================');
  console.log('               BẢNG TỔNG HỢP THEO HOST');
  console.log('======================================================');
  console.table(Object.keys(hostCounts).map(k => ({
    'Host': k,
    'Tổng': hostCounts[k].total,
    'OK': hostCounts[k].ok,
    'Lỗi': hostCounts[k].broken,
    'Thiếu': hostCounts[k].missing,
    'Tỷ lệ OK (%)': (hostCounts[k].ok / hostCounts[k].total * 100).toFixed(2)
  })));

  console.log('\n======================================================');
  console.log('            BẢNG TỔNG HỢP THEO DANH MỤC (VERTICAL)');
  console.log('======================================================');
  console.table(Object.keys(verticalCounts).map(k => ({
    'Danh mục': k,
    'Tổng': verticalCounts[k].total,
    'OK': verticalCounts[k].ok,
    'Lỗi': verticalCounts[k].broken,
    'Thiếu': verticalCounts[k].missing,
    'Tỷ lệ OK (%)': (verticalCounts[k].ok / verticalCounts[k].total * 100).toFixed(2)
  })));

  console.log(`\nKết quả chi tiết được lưu tại: ${CSV_FILE}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Audit fatal error:', err);
    process.exit(1);
  });
}

module.exports = { auditSingleUrl };
