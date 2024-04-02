import { z } from 'zod'

import type { Field } from '~/types'

export const ONE_HOUR_IN_SECONDS = 60 * 60

export const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

// INFO: represents the state of the game
export const fields: Field[] = [
  { value: '', x: 0, y: 0 },
  { value: '', x: 1, y: 0 },
  { value: '', x: 2, y: 0 },
  { value: '', x: 0, y: 1 },
  { value: '', x: 1, y: 1 },
  { value: '', x: 2, y: 1 },
  { value: '', x: 0, y: 2 },
  { value: '', x: 1, y: 2 },
  { value: '', x: 2, y: 2 },
]
