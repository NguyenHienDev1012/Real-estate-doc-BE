import { HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
const STATUS_CUSTOM_DEFAULT = 1000;

export class BaseController {
  public throwException(msg: string, status = STATUS_CUSTOM_DEFAULT) {
    let message = 'Something went wrong';

    if (
      (status >= HttpStatus.BAD_REQUEST && status < HttpStatus.INTERNAL_SERVER_ERROR) ||
      status >= STATUS_CUSTOM_DEFAULT
    ) {
      message = msg;
    }

    throw new HttpException(message, status);
  }

  public responseJson(@Res() res: Response, data: any, status = 200) {
    const availableStatus = [200, 201, 400, 401, 404, 405, 500];
    const resStatus = availableStatus.includes(status) ? status : HttpStatus.INTERNAL_SERVER_ERROR;
    return res.status(resStatus).json(data);
  }
}
