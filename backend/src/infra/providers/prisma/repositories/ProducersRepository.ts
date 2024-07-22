import { Prisma, Producer } from '@prisma/client';
import { injectable } from 'inversify';

import { prisma } from '../database';

import { IDashboardData, IProducersRepository } from 'domain/repositories/ProducersRepository.interface';

import { ICreateProducerDTO } from 'domain/dtos/ICreateProducerDTO';
import { IUpdateProducerDTO } from 'domain/dtos/IUpdateProducerDTO';
import { ICrops } from 'domain/helpers/constants';

@injectable()
class ProducersRepository implements IProducersRepository {
  private ormRepository: Prisma.ProducerDelegate;

  constructor() {
    this.ormRepository = prisma.producer;
  }

  public async findById(producerId: string): Promise<Producer | null> {
    const producer = await this.ormRepository.findUnique({
      where: { id: producerId },
    });

    return producer;
  }

  public async findByDocument(document: string): Promise<Producer | null> {
    const producer = await this.ormRepository.findUnique({
      where: { document },
    });

    return producer;
  }

  public async create(producer: ICreateProducerDTO): Promise<string> {
    const producerCreated = await this.ormRepository.create({ data: producer });

    return producerCreated.id;
  }

  public async update(producer: IUpdateProducerDTO): Promise<string> {
    const producerUpdated = await this.ormRepository.update({
      where: { id: producer.id },
      data: producer,
    });

    return producerUpdated.id;
  }

  public async delete(producerId: string): Promise<string> {
    const producerDeleted = await this.ormRepository.delete({ where: { id: producerId } });

    return producerDeleted.id;
  }

  public async generateDashboardData(): Promise<IDashboardData> {
    const producers = await this.ormRepository.findMany();

    const response = producers.reduce((data, producer) => {
      const totalByCrops = data.totalByCrops;

      const crops: Array<keyof ICrops> = producer.crops as Array<keyof ICrops>;

      crops.forEach(crop => {
        if (totalByCrops[crop]) {
          totalByCrops[crop] += 1;
        } else {
          totalByCrops[crop] = 1;
        }
      });

      const state = data.totalByStates[producer.state];

      return {
        totalFarms: data.totalFarms + 1,
        totalAcres: data.totalAcres + producer.acres,
        totalByStates: {
          ...data.totalByStates,
          [producer.state]: state ? state + 1 : 1,
        },
        totalByCrops,
        totalCrops: data.totalCrops + producer.crops.length,
        totalFreeArea: data.totalFreeArea + producer.freeArea,
        totalPlantedArea: data.totalPlantedArea + producer.plantedArea,
      };
    }, {
      totalFarms: 0,
      totalAcres: 0,
      totalByStates: {} as {[key: string]: number},
      totalByCrops: {} as ICrops,
      totalCrops: 0,
      totalFreeArea: 0,
      totalPlantedArea: 0,
    });

    return response;
  }
}

export default ProducersRepository;
