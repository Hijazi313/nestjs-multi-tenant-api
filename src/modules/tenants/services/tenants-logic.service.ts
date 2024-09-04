import { Injectable } from "@nestjs/common";
import { TenantsRepository } from "../tenants.repository";

@Injectable()
export class TenantsLogicService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}
  async getTenantById(id: string) {
    return this.tenantsRepository.findById(id);
  }
}
