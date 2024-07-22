import { injectable, inject } from 'inversify';

import { IProducersRepository } from '../repositories/ProducersRepository.interface';

import { ICreateProducerDTO } from 'domain/dtos/ICreateProducerDTO';

import { validateDocument } from 'domain/helpers/validateDocument';

import { AppError } from 'infra/errors/AppError';

@injectable()
class CreateProducerUseCase {
  constructor(
    @inject('ProducersRepository') private producersRepository: IProducersRepository,
  ) { }

  public async execute(producer: ICreateProducerDTO) {
    if ((producer.freeArea + producer.plantedArea) > producer.acres) {
      throw new AppError('The sum of free and planted area must not be greater than the acres of ​​the farm');
    }

    if (!validateDocument(producer.document)) {
      throw new AppError('Document given is invalid.');
    }

    const producerAlreadyExists = await this.producersRepository.findByDocument(producer.document);

    if (producerAlreadyExists) {
      throw new AppError('Producer with this document already exists.');
    }

    const producerId = await this.producersRepository.create(producer);

    return producerId;
  }
}

export { CreateProducerUseCase };
