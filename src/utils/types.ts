export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errorsValidation?: ErrorValidation | null;
};

export type ErrorType = 'General' | 'Raw' | 'Validation' | 'Unauthorized' | 'notfound';

export type ErrorValidation = { [key: string]: string };
