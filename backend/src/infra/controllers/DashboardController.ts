import { Request, Response } from 'express';

import { container } from 'infra/config/container';

import { GenerateDashboardDataUseCase } from 'domain/usecases/GenerateDashboardDataUseCase';

class DashboardController {
  public async index(req: Request, res: Response): Promise<Response> {
    const generateDashboardDataUseCase = container.get(GenerateDashboardDataUseCase);

    const dashboardData = await generateDashboardDataUseCase.execute();

    return res.json(dashboardData);
  }
}

export { DashboardController };
