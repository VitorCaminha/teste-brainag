import { ErrorRequestHandler } from 'express';
import { z } from 'zod';

import { AppError } from './AppError';

const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  if (error instanceof z.ZodError) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: error.issues
        .map(issue => `${issue.path}: ${issue.message}`)
        .join('. '),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);

  return res.status(500).json({ message: 'Internal server error.' });
};

export { errorHandler };
