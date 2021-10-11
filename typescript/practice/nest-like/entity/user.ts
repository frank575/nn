import {UserRole} from "../enum/user";

export interface User {
  username: string
  password: string
  role: UserRole
}

// 模擬 db 資料
export const userDb: User[] = [
  {
    username: 'admin',
    password: '123',
    role: UserRole.ADMIN
  },
  {
    username: 'frank.wcw',
    password: '123',
    role: UserRole.USER
  },
]
