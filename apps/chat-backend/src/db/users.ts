import { User } from '@wkart/interfaces';

export const users: User[] = [
  {
    id: 'USER_1',
    name: 'John Doe',
    email: 'johndoe@example.com'
  },
  {
    id: 'USER_2',
    name: 'Mary Jane',
    email: 'mary@example.com'
  },
  {
    id: 'ADMIN',
    name: 'Admin',
    email: 'admin@example.com'
  },
]

Object.freeze(users);