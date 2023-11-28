import { IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  readonly username: string;

  @MinLength(6)
  readonly password: number;

  @IsOptional()
  @IsString()
  readonly role: string;
}
