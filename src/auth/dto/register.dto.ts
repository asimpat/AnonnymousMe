import { IsOptional, IsNotEmpty, Length, IsString } from 'class-validator';
export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password: string;

  @IsOptional()
  @IsString()
  readonly role: string;
}
