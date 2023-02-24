import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'username',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'user name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'user password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'user email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'user phone',
  })
  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    description: 'user role',
  })
  role?: string;
}
