import { z } from 'zod';

const coordinateRegex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;

const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .max(255),
  email: z.string().email({
    message: 'Email must be a valid email',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
  birthdate: z.string().min(10).max(10),
  gender: z.enum(['MALE', 'FEMALE']),
  location: z
    .string()
    .regex(coordinateRegex, {
      message:
        'Location must be a valid coordinate string (latitude, longitude)',
    })
    .min(1)
    .max(255),
  bio: z.string().min(1).max(255),
});

const loginSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid email',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
});

export { userSchema, loginSchema };
