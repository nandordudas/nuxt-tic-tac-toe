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

/*  */

export interface Payload {
  message: string
  user: string
}
