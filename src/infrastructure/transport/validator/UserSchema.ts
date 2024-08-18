import { z } from 'zod';

const coordinateRegex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
const birthdateRegex = /^\d{2}-\d{2}-\d{4}$/;

const preferenceSchema = z.object({
  minAge: z.number().int().min(18).max(100),
  maxAge: z.number().int().min(18).max(100),
  maxDistance: z.number().int().min(1).max(50000),
});

const profileSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .max(255),
  birthdate: z.string().min(10).max(10).regex(birthdateRegex, {
    message: 'Birthdate must be in dd-mm-yyyy format',
  }),
  location: z
    .string()
    .regex(coordinateRegex, {
      message:
        'Location must be a valid coordinate string (latitude, longitude)',
    })
    .min(1)
    .max(255),
  bio: z.string().min(1).max(512),
  hobbies: z.string().min(1),
});

export { preferenceSchema, profileSchema };
