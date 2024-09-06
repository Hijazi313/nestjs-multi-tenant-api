import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Joi from "joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { UserModule } from "./modules/users/user.module";

import config from "./config/config";
import { ProductsModule } from "./modules/products/products.module";
import { TenantsModule } from "./modules/tenants/tenants.module";
import { BusinessesModule } from "./modules/businesses/businesses.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      cache: true,
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid("development", "staging", "test", "production")
          .default("development"),
        MONGO_URI: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_MS: Joi.number().default(3600000),
        ENCRYPTION_SECRET_KEY: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({ global: true }),
    AuthModule,
    UserModule,
    ProductsModule,
    TenantsModule,
    BusinessesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
