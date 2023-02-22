import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'User new password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
