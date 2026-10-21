import { Request } from 'express';

/**
 * Xác định chính xác publicBaseUrl dựa trên:
 * 1. PUBLIC_BASE_URL (nếu được cấu hình trong biến môi trường)
 * 2. Header X-Forwarded-Proto và Host CHỈ KHI TRUST_PROXY=true hoặc BEHIND_CLOUDFLARE=true
 * 3. Ngược lại dùng origin hoặc protocol://host thực tế của request
 */
export function resolvePublicBaseUrl(req: Request | any): string {
  const rawPublicBase = process.env.PUBLIC_BASE_URL;
  if (rawPublicBase && rawPublicBase.trim()) {
    return rawPublicBase.trim().replace(/\/+$/, '');
  }

  const trustProxy = process.env.TRUST_PROXY === 'true' || process.env.BEHIND_CLOUDFLARE === 'true';
  if (trustProxy && req.headers) {
    const proto = ((req.headers['x-forwarded-proto'] as string)?.split(',')[0].trim()) || req.protocol || 'http';
    const host = ((req.headers['x-forwarded-host'] as string)?.split(',')[0].trim()) || req.headers.host || 'localhost:3000';
    return `${proto}://${host}`;
  }

  // Không tin các header x-forwarded khi chưa bật cờ -> dùng origin hoặc host nguyên bản
  const origin = req.get ? req.get('origin') : req.headers?.origin;
  if (origin && origin !== 'null') {
    return String(origin).replace(/\/+$/, '');
  }

  const host = (req.get ? req.get('host') : req.headers?.host) || 'localhost:3000';
  const proto = req.protocol || 'http';
  return `${proto}://${host}`;
}
