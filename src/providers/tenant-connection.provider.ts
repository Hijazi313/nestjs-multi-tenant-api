import { InternalServerErrorException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";

export const tenantConnectionProvider = {
  provide: "TENANT_CONNECTION",
  useFactory: async (req, connection: Connection) => {
    if (!req.tenant)
      throw new InternalServerErrorException(
        "Make sure to apply tenants middleware"
      );
    return connection.useDb(`master_multi_tenant_${req.tenantId}`);
  },
  inject: [REQUEST, getConnectionToken()],
};
