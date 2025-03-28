import { ApiProperty } from '@nestjs/swagger';

export class PhoneModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  price: number;
}
