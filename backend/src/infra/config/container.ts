import { Container } from 'inversify';

import ProducersRepository from 'infra/providers/prisma/repositories/ProducersRepository';

const container = new Container({ autoBindInjectable: true });

container.bind('ProducersRepository').to(ProducersRepository);

export { container };
