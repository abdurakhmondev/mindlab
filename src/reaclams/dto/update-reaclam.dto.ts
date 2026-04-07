import { createZodDto } from 'nestjs-zod';
import { CreateReaclamSchema } from './create-reaclam.dto';

export class UpdateReaclamDto extends createZodDto(
  CreateReaclamSchema.partial(),
) {}
