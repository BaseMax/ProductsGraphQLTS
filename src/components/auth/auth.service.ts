import { Injectable } from '@nestjs/common';
import AuthRepo from './auth.repo';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterInput } from './dto/register-auth.input';
import { LoginInput } from './dto/login-auth.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private jwtService: JwtService,
  ) {}

  private hashData(data: string | Buffer) {
    return hashSync(data, 8);
  }

  private compareData(data: string | Buffer, enc: string) {
    return compareSync(data, enc);
  }

  private createJwt(payload: string | Buffer | Record<any, any>) {
    return this.jwtService.sign(payload);
  }

  public async register({ email, name, password }: RegisterInput) {
    const isuserExists = await this.authRepo.findOneByEmail(email);
    if (isuserExists)
      return {
        created: false,
        message: 'user exists with this email',
      };

    const newPassword = this.hashData(password);

    const newUser = await this.authRepo.create({
      email,
      name,
      password: newPassword,
    });

    return {
      ...newUser,
      created: true,
      message: 'your registration is successful',
    };
  }

  public async login({ email, password }: LoginInput) {
    const user = await this.authRepo.findOneByEmail(email);

    if (!user || !this.compareData(password, user.password))
      return {
        message: 'email or password is wrong',
      };

    const payload = {
      id: user._id,
      isadmin: user.isadmin,
    };
    const accessToken = this.createJwt(payload);

    return {
      accessToken,
      message: 'login is successful',
    };
  }
}
