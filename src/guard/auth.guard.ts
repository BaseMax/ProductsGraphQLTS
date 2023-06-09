import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AtGuard {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.header('authorization').split('=')[1] as string;

    if (!token) throw new UnauthorizedException();

    try {
      this.jwtService.verify(token);
      const pd = this.jwtService.decode(token) as {
        id: string;
        isadmin: boolean;
      };

      if (!pd.isadmin) throw new UnauthorizedException();

      const user = await this.userModel.findOne({ _id: pd.id });

      if (!user) throw new UnauthorizedException();

      if (
        user.email !== process.env.ADMIN_EMAIL ||
        !compareSync(process.env.ADMIN_PASS, user.password)
      )
        throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  handleRequest(err, user, info: Error) {
    if (err || info) throw new HttpException('please login', 498);

    return user;
  }
}
