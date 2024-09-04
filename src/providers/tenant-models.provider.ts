import { InternalServerErrorException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { getConnectionToken } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import {
  Product,
  ProductSchema,
} from "src/modules/products/models/product.model";

export const tenantModelsProvider = {
  productModel: {
    provide: "PRODUCT_MODEL",
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(Product.name, ProductSchema);
    },
    inject: ["TENANT_CONNECTION", getConnectionToken()],
  },
};
