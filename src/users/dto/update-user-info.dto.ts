import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateUserInfoSchema = z.object({
  name: z.string().min(1).optional().describe('The name of the user'),
  phoneNumber: z
    .string()
    .min(5)
    .optional()
    .describe('The phone number of the user'),
  age: z.number().int().min(0).optional().describe('The age of the user'),
  balance: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('The balance of the user'),
  score: z.number().int().min(0).optional().describe('The score of the user'),
  activity: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('The activity level of the user'),
  wonCount: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('The number of times the user won'),
});

export class UpdateUserInfoDto extends createZodDto(UpdateUserInfoSchema) {}
