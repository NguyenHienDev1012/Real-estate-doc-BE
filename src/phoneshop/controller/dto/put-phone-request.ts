import { ApiProperty } from '@nestjs/swagger';

export class PutPhoneRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: number;

  @ApiProperty()
  price: number;
}
