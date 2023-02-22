import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateJwt(id: string): Promise<any> {
    return this.usersService.model
      .scope(['withoutPassword', 'withoutToken'])
      .findOne({
        where: { id },
      });
  }

  async login(user: User): Promise<any> {
    if (!user) {
      throw new UnauthorizedException();
    }

    await this.usersService.model.update(
      {
        lastLogin: new Date(),
      },
      {
        where: {
          id: user.id,
        },
      },
    );

    user = await this.usersService.model
      .scope(['withoutPassword', 'withoutToken'])
      .findOne({
        where: {
          id: user.id,
        },
      });

    return {
      user: user,
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.model.findOne({
      where: { username },
    });
    if (!!user && user.comparePasswordSync(password)) {
      // const result = user.toJSON();
      // delete result.password;
      return user;
    }
    return null;
  }
}
