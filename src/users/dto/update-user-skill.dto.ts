import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateUserSkillSchema = z.object({
  thinkingSpeed: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Thinking speed skill level'),
  attention: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Attention skill level'),
  concentration: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Concentration skill level'),
  logic: z.number().int().min(0).optional().describe('Logic skill level'),
  memory: z.number().int().min(0).optional().describe('Memory skill level'),
  iq: z.number().int().min(0).optional().describe('IQ score'),
  iqDifference: z.number().int().optional().describe('IQ difference'),
});

export class UpdateUserSkillDto extends createZodDto(UpdateUserSkillSchema) {}
