import { HttpStatusCode } from 'axios';

export class DomainException extends Error {
  private readonly status: HttpStatusCode;

  constructor(message: string, status: HttpStatusCode) {
    super(message);
    this.status = status;
  }
}