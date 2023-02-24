import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Order } from 'sequelize/types';

export class PaginationNoOrderDto {
  @ApiPropertyOptional({
    description: 'Number of resources to fetch',
  })
  @IsOptional()
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @IsNotEmpty()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Number of page',
    default: 1,
  })
  @IsOptional()
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  page?: number;
}

export class PaginationDto extends PaginationNoOrderDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Resourse order ex: field1:ASC,field2:DESC',
  })
  @IsOptional()
  @Transform((e) =>
    e.value?.split(',')?.map((e) => {
      const [field, order] = e.split(':');
      return [...field.split('.'), order ?? 'ASC'];
    }),
  )
  @IsNotEmpty()
  order?: Order;
}
