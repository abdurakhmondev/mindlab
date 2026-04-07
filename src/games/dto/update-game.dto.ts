import { createZodDto } from 'nestjs-zod';
import { CreateGameSchema } from './create-game.dto';

export class UpdateGameDto extends createZodDto(CreateGameSchema.partial()) {}
