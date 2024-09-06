import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { TenantsModule } from "../tenants/tenants.module";

@Module({
  imports: [
    PassportModule,
    TenantsModule,

    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
    //     secretOrPrivateKey: configService.getOrThrow<string>(
    //       'JWT_ACCESS_TOKEN_SECRET',
    //     ),
    //     signOptions: {
    //       expiresIn: `${configService.getOrThrow<number>('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
