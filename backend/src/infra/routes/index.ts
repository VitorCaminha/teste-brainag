import { Router } from 'express';

import { producersRoutes } from './producers.routes';
import { dashboardRoutes } from './dashboard.routes';

const routes = Router();

routes.use('/producers', producersRoutes);
routes.use('/dashboard', dashboardRoutes);

export { routes };
