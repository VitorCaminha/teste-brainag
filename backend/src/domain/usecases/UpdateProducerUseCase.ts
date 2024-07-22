import { injectable, inject } from 'inversify';

import { IProducersRepository } from '../repositories/ProducersRepository.interface';

import { IUpdateProducerDTO } from 'domain/dtos/IUpdateProducerDTO';

import { validateDocument } from 'domain/helpers/validateDocument';

import { AppError } from 'infra/errors/AppError';

@injectable()
class UpdateProducerUseCase {
  constructor(
    @inject('ProducersRepository')
    private producersRepository: IProducersRepository,
  ) { }

  public async execute(producer: IUpdateProducerDTO) {
    if ((producer.freeArea + producer.plantedArea) > producer.acres) {
      throw new AppError('The sum of free area and planted area must not be greater than the acres of ​​the farm');
    }

    const oldProducer = await this.producersRepository.findById(producer.id);

    if (!oldProducer) {
      throw new AppError('Producer with this id not found.', 404);
    }

    if (producer.document !== oldProducer.document) {
      if (!validateDocument(producer.document)) {
        throw new AppError('Document given is invalid.');
      }

      const producerAlreadyExists = await this.producersRepository.findByDocument(producer.document);

      if (producerAlreadyExists) {
        throw new AppError('Producer with this document already exists.');
      }
    }

    await this.producersRepository.update(producer);

    return producer;
  }
}

export { UpdateProducerUseCase };
