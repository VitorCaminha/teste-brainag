import { Request, Response } from 'express';

import { container } from 'infra/config/container';

import { CreateProducerSchema } from 'domain/dtos/ICreateProducerDTO';
import { UpdateProducerSchema } from 'domain/dtos/IUpdateProducerDTO';

import { CreateProducerUseCase } from 'domain/usecases/CreateProducerUseCase';
import { UpdateProducerUseCase } from 'domain/usecases/UpdateProducerUseCase';
import { DeleteProducerUseCase } from 'domain/usecases/DeleteProducerUseCase';

class ProducersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const parsedProducer = CreateProducerSchema.parse(req.body);

    const createProducerUseCase = container.get(CreateProducerUseCase);

    const producerId = await createProducerUseCase.execute(parsedProducer);

    return res.status(201).json({ producerId });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { producerId } = req.params;

    const producerData = { ...req.body, id: producerId };

    const parsedProducer = await UpdateProducerSchema.parseAsync(producerData);

    const updateProducerUseCase = container.get(UpdateProducerUseCase);

    const producer = await updateProducerUseCase.execute(parsedProducer);

    return res.json({ producer });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { producerId } = req.params;

    const deleteProducerUseCase = container.get(DeleteProducerUseCase);

    const id = await deleteProducerUseCase.execute(producerId);

    return res.json({ id });
  }
}

export { ProducersController };
