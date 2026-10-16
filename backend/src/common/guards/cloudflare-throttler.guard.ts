import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CloudflareThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Chỉ tin cậy CF-Connecting-IP khi có cấu hình BEHIND_CLOUDFLARE=true
    if (process.env.BEHIND_CLOUDFLARE === 'true') {
      const cfIp = req.headers['cf-connecting-ip'];
      if (cfIp) {
        return (Array.isArray(cfIp) ? cfIp[0] : String(cfIp)).trim();
      }
    }

    // Chỉ tin cậy X-Forwarded-For khi có cấu hình TRUST_PROXY=true
    if (process.env.TRUST_PROXY === 'true') {
      const forwarded = req.headers['x-forwarded-for'];
      if (forwarded) {
        const str = Array.isArray(forwarded) ? forwarded[0] : String(forwarded);
        return str.split(',')[0].trim();
      }
    }

    return req.ip;
  }
}
