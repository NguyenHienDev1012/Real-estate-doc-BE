import { ApiProperty } from '@nestjs/swagger';

export class PostPhoneRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: number;

  @ApiProperty()
  price: number;
}
