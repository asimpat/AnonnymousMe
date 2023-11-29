import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { UserRegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async generateJwt(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async registerUser(register: UserRegisterDto): Promise<User | object> {
    const { username, password } = register;
    const usernameExist = await this.findByUsername(register.username);
    if (usernameExist) {
      throw new BadRequestException('user with this username already exist');
    }

    const hashPsaaword = await bcrypt.hash(password, 12);

    //   save user in the database
    const user = await this.userModel.create({
      username,
      password: hashPsaaword,
    });

    const userWithoutPassword = user.toJSON();
    return { msg: `${userWithoutPassword.username} successfully registered` };
  }

  async loginUser(payload: UserDto) {
    const user = await this.findByUsername(payload.username);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    } else {
      const passwordMatch = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new BadRequestException('Incorrect credentials ');
      }

      return { message: 'Login successful!' };
    }
  }

  async getAllUsers() {
    const result = await this.userModel.find().populate('messages');
    const totalUsers = await this.userModel.countDocuments();
    result.forEach((user) => delete user.password);

    return { result, totalUsers };
  }
}
