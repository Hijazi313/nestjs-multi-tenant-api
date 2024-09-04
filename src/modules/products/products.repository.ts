import { MongoEntityRepository } from "src/common/mongo-abstract.repository";
import { Product } from "./models/product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class ProductsRepository extends MongoEntityRepository<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {
    super({ entityModel: productModel, errLogger: true });
  }
}
