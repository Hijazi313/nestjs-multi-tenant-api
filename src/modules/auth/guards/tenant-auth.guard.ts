import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { UsersLogicService } from "src/modules/users/services/users-logic.service";
import { AuthService } from "../auth.service";

@Injectable()
export class TenantAuthGuard implements CanActivate {
  constructor(
    private readonly usersLogicService: UsersLogicService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.tenant) throw new UnauthorizedException("Missing Tenant id");
    const tenantId = request.tenant;
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException("Missing access token");
    const userId = await this.checkTokenValidity(token, tenantId);
    request.userInfo = {
      id: userId,
    };
    return true;
  }

  private extractTokenFromHeader(req: Request) {
    return req.headers.authorization?.split(" ")[1];
  }
  private async checkTokenValidity(
    token: string,
    tenantId: string
  ): Promise<string> {
    try {
      const secret =
        await this.authService.fetchAccessTokenSecretSigninKey(tenantId);
      const payload = await this.jwtService.verify(token, { secret });
      return payload.userId;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
