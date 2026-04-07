import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email().describe('The email of the user'),
  password: z.string().describe('The password of the user'),
});

export class LoginDto extends createZodDto(LoginSchema) {}
