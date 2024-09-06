import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class TenantConnectionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getTenantConnection(tenantId: string): Connection {
    const tenantSchema = `master_multi_tenant_${tenantId}`;
    return this.connection.useDb(tenantSchema);
  }

  async getTenantModel({ name, schema }, tenantId: string) {
    const tenantConnection = this.getTenantConnection(tenantId);
    return tenantConnection.model(name, schema);
  }
}
