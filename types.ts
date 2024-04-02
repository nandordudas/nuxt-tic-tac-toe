export type Nullable<T> = T | null

export interface Entity {
  id: number
}

export interface User extends Entity {
  email: string
}

export interface UserWithPassword extends User {
  password: string
}
