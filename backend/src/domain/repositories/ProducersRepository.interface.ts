import { Producer } from '@prisma/client';

import { ICreateProducerDTO } from '../dtos/ICreateProducerDTO';
import { IUpdateProducerDTO } from '../dtos/IUpdateProducerDTO';

import { ICrops } from '../helpers/constants';

interface IDashboardData {
  totalFarms: number;
  totalAcres: number;
  totalByStates: {[key: string]: number};
  totalByCrops: ICrops;
  totalCrops: number;
  totalFreeArea: number;
  totalPlantedArea: number;
}

interface IProducersRepository {
  findById(producerId: string): Promise<Producer | null>;
  findByDocument(document: string): Promise<Producer | null>;
  create(producer: ICreateProducerDTO): Promise<string>;
  update(producer: IUpdateProducerDTO): Promise<string>;
  delete(producerId: string): Promise<string>;
  generateDashboardData(): Promise<IDashboardData>;
}

export { IProducersRepository, IDashboardData };
