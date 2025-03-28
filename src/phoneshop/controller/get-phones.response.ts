import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
import { PhoneModel } from 'src/phoneshop/model';

export class GetPhonesResponse extends BaseResponse {
  @ApiProperty({ type: [PhoneModel] })
  data: PhoneModel[];

  constructor(data: PhoneModel[]) {
    super(true, null);
    this.data = data;
  }

  static of(data: PhoneModel[]): GetPhonesResponse {
    return new GetPhonesResponse(data);
  }
}
