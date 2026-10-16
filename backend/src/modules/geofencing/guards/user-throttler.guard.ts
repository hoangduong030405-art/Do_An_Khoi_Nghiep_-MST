import { Injectable } from '@nestjs/common';
import { CloudflareThrottlerGuard } from '../../../common/guards/cloudflare-throttler.guard';

@Injectable()
export class UserThrottlerGuard extends CloudflareThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    if (req.user && req.user.id) {
      return req.user.id; // rate limit by user ID
    }
    return super.getTracker(req);
  }
}
