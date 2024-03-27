interface User {
  name: string | null
  email: string | null
}

const user: User = {
  email: null,
  name: null,
}

export const useUser = (): Ref<User> => useState<User>('user', () => user)
