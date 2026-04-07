import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GameTypeEnum = z.enum([
  'MATH',
  'GEOGRAPHY',
  'PAZL',
  'LANGUAGE',
  'GALAXY',
  'ATTENTION',
  'TIMING',
  'SPEED',
  'REACTION',
  'CONCENTRATION',
  'RACING',
  'MEMORY',
]);

export const CreateGameSchema = z.object({
  title: z.string().min(1).describe('The title of the game'),
  subtitle: z.string().min(1).describe('The subtitle of the game'),
  imageUrl: z.string().url().describe('The image URL of the game'),
  type: GameTypeEnum.describe('The type of the game'),
});

export class CreateGameDto extends createZodDto(CreateGameSchema) {}
