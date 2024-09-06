import { Injectable } from "@nestjs/common";
import { TenantsRepository } from "../tenants.repository";
import { Tenant } from "../models/tenant.model";
import { FilterQuery } from "mongoose";

@Injectable()
export class TenantsLogicService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}
  async getTenantById(id: string) {
    return this.tenantsRepository.findById(id);
  }

  async getOneTenant(entityFilterQuery: FilterQuery<Tenant>) {
    return this.tenantsRepository.findOne(entityFilterQuery);
  }
}
