import type { z } from 'zod'

import type { UserWithPassword } from '~/types'

import type { FormSubmitEvent } from '#ui/types'

// TODO: add better type definition
type FormSchema = z.output<typeof registerFormSchema> | z.output<typeof loginFormSchema>

export function onSubmit(
  { data }: FormSubmitEvent<FormSchema>,
  callback: (data: Omit<UserWithPassword, 'id'>) => void,
): void {
  callback(data)
}
