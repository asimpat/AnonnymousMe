import {
  IsOptional,
  IsNotEmpty,
  Length,
  IsString,
  IsEnum,
} from 'class-validator';
import { Roles } from '../schema/user.schema';
export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password: string;

  @IsString()
  @IsEnum(Roles, { message: 'please enter correct role here' })
  readonly role: Roles;
}
