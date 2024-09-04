import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./models/product.model";
import { TenantsMiddleware } from "src/middlewares/tenants.middleware";
import { ProductsRepository } from "./products.repository";
import { tenantConnectionProvider } from "src/providers/tenant-connection.provider";
import { tenantModelsProvider } from "src/providers/tenant-models.provider";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    tenantConnectionProvider,
    tenantModelsProvider.productModel,
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).forRoutes(ProductsController);
  }
}
