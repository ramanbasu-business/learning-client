export type UUID = string
export type ISODate = string
export type ISODateTime = string


export interface Profile {
  id: UUID
  username: string
  email: string
  name: string
  roleName?: string
}