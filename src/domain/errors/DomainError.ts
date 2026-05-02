import { ERROR_MESSAGES } from '../../shared/constants/errorMessages';

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(ERROR_MESSAGES.AUTH.USER_ALREADY_EXISTS(email));
    this.name = 'EmailAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    this.name = 'InvalidCredentialsError';
  }
}

export class InvalidTokenError extends DomainError {
  constructor(message = ERROR_MESSAGES.AUTH.INVALID_TOKEN) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

export class ShortUrlNotFoundError extends DomainError {
  constructor() {
    super('Short URL not found');
    this.name = 'ShortUrlNotFoundError';
  }
}

export class UrlGenerationError extends DomainError {
  constructor() {
    super('Failed to generate a unique short URL after multiple attempts. Please try again.');
    this.name = 'UrlGenerationError';
  }
}
