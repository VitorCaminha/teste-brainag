import { z } from 'zod';

import { CropsSchema } from './ICreateProducerDTO';

const UpdateProducerSchema = z.object({
  id: z.string().min(1, 'Id is required'),
  document: z.string().min(1, 'Document is required').transform(document => document.replace(/[^\d]+/g, '')),
  producerName: z.string().min(1, 'Producer name is required'),
  farmName: z.string().min(1, 'Farm name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  acres: z.number().min(0, 'Acres is required and greater or equal than 0'),
  freeArea: z.number().min(0, 'Free area is required and greater or equal than 0'),
  plantedArea: z.number().min(0, 'Planted area is required and greater or equal than 0'),
  crops: z.array(CropsSchema).nonempty('At least one crop is required'),
});

type IUpdateProducerDTO = z.infer<typeof UpdateProducerSchema>;

export { IUpdateProducerDTO, UpdateProducerSchema };
