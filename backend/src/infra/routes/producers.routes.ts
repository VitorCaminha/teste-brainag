import { Router } from 'express';

import { ProducersController } from '../controllers/ProducersController';

const producersRoutes = Router();

const producersController = new ProducersController();

producersRoutes.post('/', producersController.create);
producersRoutes.put('/:producerId', producersController.update);
producersRoutes.delete('/:producerId', producersController.delete);

export { producersRoutes };
