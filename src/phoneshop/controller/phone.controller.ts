import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhoneService } from 'src/phoneshop/service';
import { BaseController } from './base.controller';
import { Response } from 'express';
import { PostPhoneRequest, PutPhoneRequest } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('phones')
@Controller('phones')
export class PhoneController extends BaseController {
  constructor(private readonly phoneService: PhoneService) {
    super();
  }

  /**
   *
   * @param response get phones
   * @returns
   */
  @Get('')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async getPhones(@Res() response: Response) {
    const phones = await this.phoneService.getPhones();
    return this.responseJson(response, { data: phones });
  }

  /**
   * Add new phone
   * @param response
   * @param requestBody
   * @returns
   */
  @Post()
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async createPost(@Res() response: Response, @Body() requestBody: PostPhoneRequest) {
    const phones = await this.phoneService.createPhone(requestBody);
    return this.responseJson(response, { data: phones });
  }

  /**
   * Delete phone
   * @param id
   * @returns
   */
  @Delete('/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async deletePost(@Param('id') id: number, @Res() response: Response) {
    const result = await this.phoneService.softDeletePhone(id);
    return this.responseJson(response, { data: result.affected });
  }

  /**
   * Update phone
   * @param response
   * @param id
   * @param requestBody
   * @returns
   */
  @Put('/update/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  public async editPost(
    @Req() req: Express.Request,
    @Res() response: Response,
    @Param('id') id: number,
    @Body() requestBody: PutPhoneRequest
  ) {
    const model = await this.phoneService.updatePhone(id, requestBody);
    return this.responseJson(response, { data: model });
  }

  @Post('/upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  public async postCreateEquipment(
    @Req() req: Express.Request,
    @Res() response: Response,
    @Body() requestBody: PostPhoneRequest,
    @UploadedFile() _file: Express.Multer.File
  ) {
    const result = await this.phoneService.uploadFile(requestBody, _file);

    return this.responseJson(response, { data: result });
  }
}
