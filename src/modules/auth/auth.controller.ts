import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupUserDto } from "./dto/user-signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "../users/models/user.model";
import { Response } from "express";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh.guard";
import { TenantLoginDto } from "./dto/tenant-login.dto";

@ApiTags("Auth (v1)")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //  POST: Signup
  // @Post('signup')
  // @HttpCode(201)
  // private async registerUser(@Body() signupData: SignupUserDto) {
  //   this.authService.signupUser(signupData);
  // }
  // POST: Login
  @Post("login")
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  private async loginUser(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(user, res);
  }

  @Post("tenant-login")
  @HttpCode(200)
  private async loginTenantUser(@Body() body: TenantLoginDto) {
    return this.authService.tenantUserLogin(body);
  }

  @Post("refresh")
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(200)
  private async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(user, res);
  }
}
