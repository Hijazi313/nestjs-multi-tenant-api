import { MongoEntityRepository } from "src/common/mongo-abstract.repository";
import { Tenant } from "./models/tenant.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class TenantsRepository extends MongoEntityRepository<Tenant> {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<Tenant>
  ) {
    super({ entityModel: tenantModel, errLogger: true });
  }
}
