import { Inject, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsRepository } from "./products.repository";
import { Connection, Model } from "mongoose";
import { Product, ProductSchema } from "./models/product.model";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @Inject("PRODUCT_MODEL") private readonly ProductModel: Model<Product>
  ) {}
  create(createProductDto: CreateProductDto) {
    return "This action adds a new product";
  }

  async findAll() {
    // const tenantConnection = await this.getTenantConnection(tenantId);
    // const tenantConnection = await this.getTenantConnection(tenantId);
    // const productModel = this.tenantConnection.model(
    //   Product.name,
    //   ProductSchema
    // );

    return this.ProductModel.find();
    // return this.tenantConnection.db.databaseName;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // private async getTenantConnection(tenantId: string) {
  //   return this.connection.useDb(`master_multi_tenant_${tenantId}`);
  // }
}
