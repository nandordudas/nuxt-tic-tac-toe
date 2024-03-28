import type { User } from '~/types'

const user: User = {
  email: null,
  name: null,
}

export const useUser = (): Ref<User> => useState<User>('user', () => user)
