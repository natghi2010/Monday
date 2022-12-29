import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(20)
  @IsOptional()
  firstName: string;
  @IsString()
  @MaxLength(20)
  @IsOptional()
  lastName: string;
  @IsEmail()
  @MaxLength(25)
  @IsNotEmpty()
  email: string;
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  password: string;
}
