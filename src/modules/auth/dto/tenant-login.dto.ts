import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class TenantLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}
