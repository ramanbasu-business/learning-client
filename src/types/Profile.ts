export type UUID = string
export type ISODate = string
export type ISODateTime = string


export interface Profile {
    id: UUID
    email: string
    first_name: string
    last_name: string
    roleName?: string
  }