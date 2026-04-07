import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateReaclamSchema = z.object({
  title: z.string().min(1).optional().describe('The title of the reaclam'),
  description: z.string().optional().describe('The description of the reaclam'),
  link: z
    .string()
    .url()
    .optional()
    .describe('The link associated with the reaclam'),
});

export class CreateReaclamDto extends createZodDto(CreateReaclamSchema) {}
