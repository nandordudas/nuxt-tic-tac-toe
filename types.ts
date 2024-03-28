export type Nullable<T> = T | null

export interface User {
  name: Nullable<string>
  email: Nullable<string>
}

export interface UserWithPassword extends User {
  password: Nullable<string>
}
