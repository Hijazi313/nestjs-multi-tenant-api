import { Module } from "@nestjs/common";
import { BusinessesService } from "./businesses.service";
import { BusinessesController } from "./businesses.controller";
import { BusinessesRepository } from "./businesses.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "./models/business.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
    ]),
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService, BusinessesRepository],
})
export class BusinessesModule {}
