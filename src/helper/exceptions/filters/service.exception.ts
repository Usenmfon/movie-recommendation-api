import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ServiceException } from '../exceptions/service.layer.exception';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(ServiceException)
export class ServiceExceptionFilter extends BaseExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost): void {
    const message = exception.message;
    super.catch(new HttpException(message, exception.code), host);
  }
}
