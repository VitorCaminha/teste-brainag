import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import { errorHandler } from './infra/errors';

import { routes } from './infra/routes';

export const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log('🚀 Back-end started on port 3333!');
});
