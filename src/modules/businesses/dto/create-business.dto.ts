import { Exclude, Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateUserRequestDto } from "src/modules/users/dto/create-user.dto";

@Exclude()
export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
}
