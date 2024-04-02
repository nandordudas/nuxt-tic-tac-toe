import { z } from 'zod'

export const ONE_HOUR_IN_SECONDS = 60 * 60

export const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
}) // .strict()
