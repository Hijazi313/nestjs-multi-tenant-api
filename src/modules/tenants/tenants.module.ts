import { Global, Module } from "@nestjs/common";
import { TenantsService } from "./tenants.service";
import { TenantsController } from "./tenants.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tenant, TenantSchema } from "./models/tenant.model";
import { tenantConnectionProvider } from "src/providers/tenant-connection.provider";
import { TenantsLogicService } from "./services/tenants-logic.service";
import { TenantsRepository } from "./tenants.repository";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
  ],
  controllers: [TenantsController],
  providers: [
    TenantsService,
    TenantsLogicService,
    TenantsRepository,
    tenantConnectionProvider,
  ],
  exports: [TenantsLogicService, tenantConnectionProvider],
})
export class TenantsModule {}
