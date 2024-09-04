import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { UpdateTenantDto } from "./dto/update-tenant.dto";
import { TenantsRepository } from "./tenants.repository";
import { UsersLogicService } from "../users/services/users-logic.service";
import { nanoid } from "nanoid";
import { hash } from "bcrypt";

@Injectable()
export class TenantsService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly usersLogicService: UsersLogicService
  ) {}
  async create(createTenantDto: CreateTenantDto) {
    const {
      user: { email, password, name },
    } = createTenantDto;
    //  Verify user does not already exists
    const user = await this.usersLogicService.getOneUser({ email });
    if (user)
      throw new BadRequestException(
        "User already exists and belongs to a company"
      );
    //  create a new tenant id
    const tenantId = nanoid(12);
    // TODO: create a new tenant secret
    //  Create new user

    const hashedPassword = await hash(password, 10);
    await this.usersLogicService.createUser(
      { name, email, password: hashedPassword },
      tenantId
    );
    //  Create Tenant record
    return this.tenantsRepository.create({ ...createTenantDto, tenantId });
  }

  findAll() {
    return this.tenantsRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
