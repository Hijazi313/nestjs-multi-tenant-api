import { MongoEntityRepository } from "src/common/mongo-abstract.repository";
import { Business } from "./models/business.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class BusinessesRepository extends MongoEntityRepository<Business> {
  constructor(
    @InjectModel(Business.name) private readonly businessModel: Model<Business>
  ) {
    super({ entityModel: businessModel, errLogger: true });
  }
}
