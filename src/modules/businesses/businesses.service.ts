import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBusinessDto } from "./dto/create-business.dto";
import { UpdateBusinessDto } from "./dto/update-business.dto";
import { BusinessesRepository } from "./businesses.repository";
import { UsersLogicService } from "../users/services/users-logic.service";
import { nanoid } from "nanoid";
import { hash } from "bcrypt";

@Injectable()
export class BusinessesService {
  constructor(
    private readonly businessesRepository: BusinessesRepository,
    private readonly usersLogicService: UsersLogicService
  ) {}
  async create(createBusinessDto: CreateBusinessDto) {
    return this.businessesRepository.create(createBusinessDto);
  }

  findAll() {
    return `This action returns all businesses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
