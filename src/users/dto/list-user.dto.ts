import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsOptional, IsUUID } from 'class-validator';
import _ from 'lodash';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class ListUserDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'search by name, username, email, phone',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'status',
    enum: ['active', 'inactive'],
  })
  @IsIn(['active', 'inactive'])
  @IsOptional()
  status: string;
}
