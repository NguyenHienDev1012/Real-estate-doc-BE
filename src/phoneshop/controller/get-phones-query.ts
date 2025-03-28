import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetPhonesQuery {
  @ApiProperty({ required: false })
  @Type(() => String)
  keyword?: string;

  @Type(() => Number)
  @ApiProperty({ required: true })
  limit?: number;

  @Type(() => Number)
  @ApiProperty({ required: true })
  page?: number;

  @Type(() => String)
  @ApiProperty({ required: true })
  orderBy: string;

  @Type(() => String)
  @ApiProperty({ required: true })
  orderDesc: string;
}
