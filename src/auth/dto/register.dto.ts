import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email().describe('The email of the user'),
  password: z.string().min(6).describe('The password of the user'),
  name: z.string().optional().describe('The name of the user'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
