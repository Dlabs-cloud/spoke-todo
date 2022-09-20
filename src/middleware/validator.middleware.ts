import { plainToClass, plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validate, Validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/custom.error';
import { ErrorValidation } from '../utils/types';

export function validates<T>(cls: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const object = plainToInstance(cls, req.body, {
      enableImplicitConversion: true,
    }) as object;

    const validationErrors = await validate(object);
    if (!validationErrors.length) {
      next();
      return;
    }
    const error: ErrorValidation = buildError(validationErrors);
    next(new CustomError(400, 'Validation', 'bad request', error));
    return;
  };
}

function buildError(errors) {
  let result = {};
  errors.forEach((el) => {
    if (el.children.length > 0) {
      result = { ...result, ...this.buildError(el.children) };
    } else {
      const prop = el.property;
      result[prop] = Object.values(el.constraints).join(',');
    }
  });
  return result;
}
