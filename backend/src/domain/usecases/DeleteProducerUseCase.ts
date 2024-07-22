import { injectable, inject } from 'inversify';

import { IProducersRepository } from '../repositories/ProducersRepository.interface';

import { AppError } from 'infra/errors/AppError';

@injectable()
class DeleteProducerUseCase {
  constructor(
    @inject('ProducersRepository')
    private producersRepository: IProducersRepository,
  ) { }

  public async execute(producerId: string) {
    const producer = await this.producersRepository.findById(producerId);

    if (!producer) {
      throw new AppError('Producer with this id not found.', 404);
    }

    const producerIdDeleted = await this.producersRepository.delete(producerId);

    return producerIdDeleted;
  }
}

export { DeleteProducerUseCase };
