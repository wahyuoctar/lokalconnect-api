import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
