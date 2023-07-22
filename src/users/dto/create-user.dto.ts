import { iUser } from 'src/@types/iUser';
import {
  IsString,
  IsEmail,
  IsAlphanumeric,
  MinLength,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto implements iUser {
  @ApiProperty()
  @IsString({ message: 'Please provide your first name' })
  @IsDefined()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString({ message: 'Please provide your last name' })
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail({}, { message: 'Please provide valid eamil' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDefined()
  @MinLength(8)
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}
