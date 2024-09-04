import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TenantsLogicService } from "src/modules/tenants/services/tenants-logic.service";

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor(private readonly tenantsLogicService: TenantsLogicService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers["x-tenant-id"]?.toString();
    if (!tenantId) throw new BadRequestException("X-TENANT-ID not provided");
    const tenant = await this.tenantsLogicService.getTenantById(tenantId);
    console.log(tenant);
    req["tenant"] = tenantId;
    next();
  }
}
