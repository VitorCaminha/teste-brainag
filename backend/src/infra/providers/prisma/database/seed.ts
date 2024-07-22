import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 100; i++) {
    const document = faker.string.numeric(11);
    const producerName = faker.person.fullName();
    const farmName = faker.company.name();
    const city = faker.location.city();
    const state = faker.location.state();
    const acres = faker.number.int({ min: 0, max: 500 });
    const freeArea = faker.number.int({ min: 0, max: acres });
    const plantedArea = faker.number.int({ min: 0, max: acres - freeArea });
    const crops = faker.helpers.arrayElements(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar'], 2);

    await prisma.producer.create({
      data: {
        document,
        producerName,
        farmName,
        city,
        state,
        acres,
        freeArea,
        plantedArea,
        crops,
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
