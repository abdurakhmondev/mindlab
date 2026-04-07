import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateGameSchema = z.object({
  title: z.string().min(1).describe('The title of the game'),
});

export class CreateGameDto extends createZodDto(CreateGameSchema) {}
