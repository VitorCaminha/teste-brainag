import { injectable, inject } from 'inversify';

import { IProducersRepository } from '../repositories/ProducersRepository.interface';

@injectable()
class GenerateDashboardDataUseCase {
  constructor(
    @inject('ProducersRepository')
    private producersRepository: IProducersRepository,
  ) { }

  public async execute() {
    const data = await this.producersRepository.generateDashboardData();

    return data;
  }
}

export { GenerateDashboardDataUseCase };
