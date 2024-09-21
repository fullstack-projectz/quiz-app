/**
 * Here the file custom validation msg for
 * print as the obj
 *
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Validation Error';
  }
}
