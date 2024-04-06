import type { z } from 'zod'

import type { UserWithPassword } from '~/types'

import type { FormSubmitEvent } from '#ui/types'

type FormSchema = z.output<typeof registerFormSchema | typeof loginFormSchema>

export function onSubmit(
  { data }: FormSubmitEvent<FormSchema>,
  callback: (data: Omit<UserWithPassword, 'id'>) => void,
): void {
  callback(data)
}
