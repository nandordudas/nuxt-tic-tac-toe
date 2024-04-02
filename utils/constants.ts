import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

export const registerFormSchema = loginFormSchema
  .extend({
    confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
