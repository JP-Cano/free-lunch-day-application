import { HttpStatusCode } from 'axios';
import { DomainException } from '../../../domain/exceptions/models/domain.exception';
import { logger } from '../logger/logger';

export function Catch() {
  return (value: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (err: any) {
        logger.error(`Error found during execution of method --> ${propertyKey}`, JSON.stringify(err));
        throw new DomainException(err.message, HttpStatusCode.InternalServerError);
      }
    };
  };
}