interface User {
  name: string | null
  email: string | null
}

const user: User = {
  email: null,
  name: null,
}

export default (): Ref<User> => {
  return useState('user', () => user)
}
